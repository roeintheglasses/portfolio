import type { GetServerSideProps } from 'next';
import { sanityClient, isSanityConfigured } from '@/sanity/lib/client';
import { storySitemapQuery } from '@/sanity/lib/queries';
import { siteConfig } from '@/config/site';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface StorySitemapData {
  slug: string;
  lastModified: string;
}

// Static pages with their metadata
const staticPages: SitemapEntry[] = [
  { loc: '', priority: 1.0, changefreq: 'weekly' },
  { loc: 'about', priority: 0.8, changefreq: 'monthly' },
  { loc: 'work', priority: 0.8, changefreq: 'monthly' },
  { loc: 'projects', priority: 0.8, changefreq: 'monthly' },
  { loc: 'stories', priority: 0.9, changefreq: 'weekly' },
  { loc: 'guestbook', priority: 0.6, changefreq: 'daily' },
];

function formatDate(date: string | Date): string {
  const d = new Date(date);
  const isoString = d.toISOString();
  return isoString.substring(0, 10);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createSitemapEntry(entry: SitemapEntry): string {
  const url = `${siteConfig.url}/${entry.loc}`;

  let xml = `  <url>\n    <loc>${escapeXml(url)}</loc>`;

  if (entry.lastmod) {
    xml += `\n    <lastmod>${entry.lastmod}</lastmod>`;
  }

  if (entry.changefreq) {
    xml += `\n    <changefreq>${entry.changefreq}</changefreq>`;
  }

  if (entry.priority !== undefined) {
    xml += `\n    <priority>${entry.priority.toFixed(1)}</priority>`;
  }

  xml += '\n  </url>';
  return xml;
}

function createSitemap(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(createSitemapEntry).join('\n')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allEntries: SitemapEntry[] = [...staticPages];

  // Fetch dynamic story pages from Sanity
  if (isSanityConfigured()) {
    try {
      const stories = await sanityClient.fetch<StorySitemapData[]>(storySitemapQuery);

      // Add journal pages for each story
      for (const story of stories) {
        if (story.slug) {
          allEntries.push({
            loc: `journal/${story.slug}`,
            lastmod: story.lastModified ? formatDate(story.lastModified) : undefined,
            changefreq: 'monthly',
            priority: 0.7,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching stories for sitemap:', error);
      // Continue with static pages only
    }
  }

  const sitemap = createSitemap(allEntries);

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=1800');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap(): null {
  return null;
}
