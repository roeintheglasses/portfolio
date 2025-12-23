export const config = {
  runtime: 'edge',
};

interface GitHubRepo {
  fork: boolean;
  stargazers_count: number;
}

export default async function handler() {
  try {
    const userResponse = await fetch('https://api.github.com/users/roeintheglasses');
    const userReposResponse = await fetch(
      'https://api.github.com/users/roeintheglasses/repos?per_page=100'
    );

    if (!userResponse.ok || !userReposResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status} / ${userReposResponse.status}`);
    }

    const user = await userResponse.json();
    const repositories: GitHubRepo[] = await userReposResponse.json();

    const mine = repositories.filter((repo) => !repo.fork);
    const stars = mine.reduce((accumulator, repository) => {
      return accumulator + repository.stargazers_count;
    }, 0);

    return new Response(
      JSON.stringify({
        followers: user.followers,
        stars,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
        },
      }
    );
  } catch (err) {
    console.error('Failed to fetch GitHub data:', err);
    return new Response(JSON.stringify({ followers: 0, stars: 0 }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
}
