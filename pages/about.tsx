import Analytics from 'components/metrics/Analytics';
import Container from 'components/Container';
import GitHub from 'components/metrics/Github';
import Link from 'next/link';
import TopTracks from 'components/TopTracks';
import Valorant from 'components/metrics/Valorant';
import Unsplash from 'components/metrics/Unsplash';
import SitePageviewsCard from 'components/metrics/Pageviews';
import { aboutData } from 'data/about';
import { LinkPreview } from '../components/ui/link-preview';

export default function About() {
  return (
    <Container
      title="About - Hrishikesh Jangir"
      description="All the info you can need about me."
    >
      <div className="max-w-5xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {aboutData.pageTitle}
        </h1>
        <div className="text-gray-700 text-l dark:text-gray-300 mb-16 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400 max-w-5xl">
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
                        if (match && highlight.companyLinks[match[1]]) {
                          const company = highlight.companyLinks[match[1]];
                          return (
                            <LinkPreview
                              key={partIndex}
                              url={company.href}
                              width={250}
                              height={150}
                              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
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
                          <Link href={highlight.link.href} className="text-blue-600 dark:text-blue-400 hover:underline">
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
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          {highlight.externalLink.text}
                        </LinkPreview>
                      )}{' '}
                      {highlight.link && (
                        <Link href={highlight.link.href} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {highlight.link.text}
                        </Link>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </p>
          <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
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
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
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
        {/* <div className="flex flex-col w-full">
        <Unsplash />
        <YouTube />
      </div> */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 my-2 w-full">
          <SitePageviewsCard />
          <Analytics />
          <GitHub />
        </div>

        <div className="text-gray-700 text-l dark:text-gray-300 mb-16 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400 max-w-5xl">
          <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            {aboutData.valorantSection.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {aboutData.valorantSection.description}
          </p>
        </div>
        <Valorant />

        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          {aboutData.topTracksSection.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {aboutData.topTracksSection.description}
        </p>
        <TopTracks />
      </div>
    </Container>
  );
}
