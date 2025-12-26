import { z } from 'zod';

export const config = {
  runtime: 'edge',
};

// Zod schemas for GitHub API responses
const GitHubRepoSchema = z.object({
  name: z.string(),
  fork: z.boolean(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  size: z.number(),
});

const GitHubUserSchema = z.object({
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
});

const GitHubLanguagesSchema = z.record(z.string(), z.number());

type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

interface LanguageStats {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
}

// GitHub language colors (subset of most common)
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Astro: '#ff5a03',
  MDX: '#fcb32c',
  Markdown: '#083fa1',
};

const DEFAULT_COLOR = '#8b8b8b';

const emptyResponse = () =>
  new Response(
    JSON.stringify({
      totalRepos: 0,
      totalStars: 0,
      followers: 0,
      languages: [],
      topLanguage: null,
      accountAge: 0,
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }
  );

export default async function handler() {
  const username = 'roeintheglasses';
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  // Add auth token if available for higher rate limits
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Fetch user data and repos in parallel
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers,
      }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      console.error(`GitHub API error: user=${userResponse.status}, repos=${reposResponse.status}`);
      return emptyResponse();
    }

    let userData: unknown;
    let reposData: unknown;

    try {
      userData = await userResponse.json();
      reposData = await reposResponse.json();
    } catch {
      console.error('Failed to parse GitHub response JSON');
      return emptyResponse();
    }

    // Validate responses
    const userParsed = GitHubUserSchema.safeParse(userData);
    const reposParsed = z.array(GitHubRepoSchema).safeParse(reposData);

    if (!userParsed.success || !reposParsed.success) {
      console.error('Invalid GitHub response structure');
      return emptyResponse();
    }

    const user = userParsed.data;
    const repos = reposParsed.data;

    // Filter out forks
    const ownRepos = repos.filter((repo) => !repo.fork);

    // Calculate total stars
    const totalStars = ownRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    // Fetch language stats for each repo (limit to top 10 by size to avoid rate limits)
    const topRepos = ownRepos.sort((a, b) => b.size - a.size).slice(0, 15);

    const languagePromises = topRepos.map(async (repo) => {
      try {
        const langResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/languages`,
          { headers }
        );
        if (!langResponse.ok) return {};

        const langData = await langResponse.json();
        const parsed = GitHubLanguagesSchema.safeParse(langData);
        return parsed.success ? parsed.data : {};
      } catch {
        return {};
      }
    });

    const languageResults = await Promise.all(languagePromises);

    // Aggregate language bytes
    const languageTotals: Record<string, number> = {};
    for (const langData of languageResults) {
      for (const [lang, bytes] of Object.entries(langData)) {
        languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
      }
    }

    // Calculate total bytes and percentages
    const totalBytes = Object.values(languageTotals).reduce((acc, bytes) => acc + bytes, 0);

    const languages: LanguageStats[] = Object.entries(languageTotals)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
        color: languageColors[name] || DEFAULT_COLOR,
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 6); // Top 6 languages

    // Calculate account age in years
    const createdDate = new Date(user.created_at);
    const now = new Date();
    const accountAge = Math.floor(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
    );

    return new Response(
      JSON.stringify({
        totalRepos: ownRepos.length,
        totalStars,
        followers: user.followers,
        languages,
        topLanguage: languages[0] || null,
        accountAge,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=3600, stale-while-revalidate=1800',
        },
      }
    );
  } catch (err) {
    console.error('Failed to fetch GitHub stats:', err);
    return emptyResponse();
  }
}
