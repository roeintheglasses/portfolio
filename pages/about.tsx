import Analytics from 'components/metrics/Analytics';
import Container from 'components/Container';
import GitHub from 'components/metrics/Github';
import Link from 'next/link';
import TopTracks from 'components/TopTracks';
import Valorant from 'components/metrics/Valorant';
import SitePageviewsCard from 'components/metrics/Pageviews';
import { aboutData } from '../data/about';
import { LinkPreview } from '../components/ui/link-preview';

export default function About() {
  return (
    <Container title="About - Hrishikesh Jangir" description="All the info you can need about me.">
      <div className="mx-auto mb-16 max-w-5xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {aboutData.pageTitle}
        </h1>
        <div className="text-l prose prose-lg prose-neutral mb-16 max-w-5xl text-gray-700 dark:prose-invert prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:text-gray-300 dark:prose-a:text-gray-200 dark:hover:prose-a:text-blue-400">
          <p>
            {aboutData.intro}
            <ul>
              {aboutData.highlights.map((highlight, index) => (
                <li key={index}>
                  <strong>{highlight.title}:</strong>{' '}
                  {highlight.companyLinks ? (
                    <>
                      {highlight.content.split(/(\{[^}]+\})/).map((part, partIndex) => {
                        const match = part.match(/\{([^}]+)\}/);
                        const companyKey = match?.[1];
                        if (companyKey && highlight.companyLinks?.[companyKey]) {
                          const company = highlight.companyLinks[companyKey];
                          if (!company) return part;
                          return (
                            <LinkPreview
                              key={partIndex}
                              url={company.href}
                              width={250}
                              height={150}
                              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                            >
                              {company.text}
                            </LinkPreview>
                          );
                        }
                        return part;
                      })}
                      {highlight.link && (
                        <>
                          {' '}
                          <Link
                            href={highlight.link.href}
                            className="text-blue-600 hover:underline dark:text-blue-400"
                          >
                            {highlight.link.text}
                          </Link>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {highlight.content}{' '}
                      {highlight.externalLink && (
                        <LinkPreview
                          url={highlight.externalLink.href}
                          width={250}
                          height={150}
                          className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {highlight.externalLink.text}
                        </LinkPreview>
                      )}{' '}
                      {highlight.link && (
                        <Link
                          href={highlight.link.href}
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {highlight.link.text}
                        </Link>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </p>
          <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
            {aboutData.linksAndStats.title}
          </h2>
          <ul>
            {aboutData.linksAndStats.links.map((link, index) => (
              <li key={index}>
                {link.label}:{' '}
                {link.href.startsWith('http') ? (
                  <LinkPreview
                    url={link.href}
                    width={250}
                    height={150}
                    className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {link.text}
                  </LinkPreview>
                ) : (
                  <Link href={link.href}>{link.text}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <SitePageviewsCard />
          <Analytics />
          <GitHub />
        </div>

        {/* Valorant Section */}
        <section className="mt-16">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-black dark:text-white">
            {aboutData.valorantSection.title}
          </h2>
          <p className="mb-6 max-w-2xl text-gray-600 dark:text-gray-400">
            {aboutData.valorantSection.description}
          </p>
          <Valorant />
        </section>

        {/* Top Tracks Section */}
        <section className="mt-16">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-black dark:text-white">
            {aboutData.topTracksSection.title}
          </h2>
          <p className="mb-6 max-w-2xl text-gray-600 dark:text-gray-400">
            {aboutData.topTracksSection.description}
          </p>
          <TopTracks />
        </section>
      </div>
    </Container>
  );
}
