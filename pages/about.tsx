import Container from 'components/Container';
import Link from 'next/link';
import TopTracks from 'components/TopTracks';
import GithubStats from 'components/metrics/GithubStats';
import Valorant from 'components/metrics/Valorant';
import { Card } from 'components/ui/Card';
import AboutSection from 'components/about/AboutSection';
import LinksAndStats from 'components/about/LinksAndStats';
import { aboutData } from '../data/about';
import { LinkPreview } from '../components/ui/link-preview';
import { motion } from 'motion/react';

export default function About() {
  return (
    <Container title="About - Hrishikesh Jangir" description="All the info you can need about me.">
      <div className="mx-auto mb-16 max-w-5xl">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl"
        >
          {aboutData.pageTitle}
        </motion.h1>

        {/* Intro Card with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card gradient="from-[#64748b] via-[#475569] to-[#94a3b8]" padding="lg" hover={false}>
            <div className="space-y-6">
              {/* Intro Text */}
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
                {aboutData.intro}
              </p>

              {/* Highlights */}
              <ul className="space-y-4">
                {aboutData.highlights.map((highlight, index) => (
                  <li key={index} className="rounded-lg bg-white/50 p-4 dark:bg-gray-800/50">
                    <strong className="text-gray-900 dark:text-white">{highlight.title}:</strong>{' '}
                    <span className="text-gray-700 dark:text-gray-300">
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
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* Links & Stats */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {aboutData.linksAndStats.title}
          </h3>
          <LinksAndStats links={aboutData.linksAndStats.links} />
        </div>

        {/* GitHub Activity Section */}
        <AboutSection
          title={aboutData.githubSection.title}
          subtitle={aboutData.githubSection.description}
        >
          <GithubStats />
        </AboutSection>

        {/* Valorant Section */}
        <AboutSection
          title={aboutData.valorantSection.title}
          subtitle={aboutData.valorantSection.description}
        >
          <Valorant />
        </AboutSection>

        {/* Top Tracks Section */}
        <AboutSection
          title={aboutData.topTracksSection.title}
          subtitle={aboutData.topTracksSection.description}
        >
          <TopTracks />
        </AboutSection>
      </div>
    </Container>
  );
}
