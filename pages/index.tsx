import Image from 'next/image';
import { Suspense } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StarsCanvas from '../components/StarCanvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { homeData } from '../data/home';
import CategorizedSkills from '../components/CategorizedSkills';
import { Timeline } from '../components/ui/timeline';
import { LinkPreview } from '../components/ui/link-preview';
import { TimelineContent } from '../components/TimelineContent';
import { IconFileCode2, IconDashboard } from '@tabler/icons-react';

export default function Home() {
  const router = useRouter();

  // Transform timeline data to include rendered content
  const timelineData = homeData.workExperience.timeline.map((item) => ({
    title: item.title,
    content: <TimelineContent item={item} />,
  }));
  const meta = {
    title: 'Hrishikesh Jangir - Developer, writer, designer.',
    description: `Front-end developer, JavaScript enthusiast, and an avid valorant player.`,
    image: 'https://roeintheglasses.dev/static/images/roe-banner.png',
    type: 'website',
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://roeintheglasses.dev${router.asPath}`} />
        <link rel="canonical" href={`https://roeintheglasses.dev${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Hrishikesh Jangir" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <StarsCanvas />

      {/* Navbar - Global */}
      <div className="relative z-30 flex flex-col justify-center px-6">
        <Navbar />
      </div>

      <Suspense fallback={null}>
        {/* First Fold - Hero Section */}
        <div className="relative -mt-36 flex min-h-screen flex-col md:h-screen">
          {/* Hero Content */}
          <div className="relative z-20 flex flex-1 items-center justify-center px-4 pb-20 pt-36 md:px-8">
            <div className="w-full max-w-5xl">
              <div
                id="heroHome"
                className="flex w-full flex-col-reverse items-center justify-between sm:flex-row sm:items-start"
              >
                <div className="flex max-w-2xl flex-col pr-0 sm:pr-8">
                  <h1 className="mb-1 text-center text-3xl font-bold tracking-tight text-black dark:text-white sm:text-left sm:text-4xl md:text-6xl">
                    {homeData.hero.name}
                  </h1>
                  <h2 className="prose prose-lg prose-neutral mb-6 text-center text-lg text-gray-700 dark:prose-invert prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:text-gray-200 dark:prose-a:text-gray-200 dark:hover:prose-a:text-blue-400 sm:text-left sm:text-xl md:text-2xl">
                    {homeData.hero.title}{' '}
                    <LinkPreview
                      url={homeData.hero.company.url}
                      className="font-semibold text-gray-800 transition-colors hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400"
                      width={250}
                      height={150}
                    >
                      {homeData.hero.company.name}
                    </LinkPreview>
                  </h2>
                  <p className="mb-6 text-center text-lg text-gray-700 dark:text-gray-300 sm:text-left sm:text-xl">
                    {homeData.hero.description}
                  </p>
                  <div className="mb-8 flex flex-col gap-6 sm:mb-16 sm:flex-row">
                    <a
                      href={homeData.hero.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        'flex flex-row items-center justify-center gap-2 rounded-full bg-zinc-300 px-6 py-2 text-center font-semibold text-gray-800 transition-all hover:bg-zinc-400 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600 sm:justify-start'
                      }
                    >
                      <IconDashboard />
                      {homeData.hero.resume.text}
                    </a>
                    <a
                      href={homeData.hero.dashboard.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        'flex flex-row items-center justify-center gap-2 rounded-full bg-zinc-300 px-6 py-2 text-center font-semibold text-gray-800 transition-all hover:bg-zinc-400 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600 sm:justify-start'
                      }
                    >
                      <IconFileCode2 />
                      {homeData.hero.dashboard.text}
                    </a>
                  </div>
                </div>
                <div
                  className={
                    'mx-auto mb-6 mt-8 w-max transform animate-gradient-xy rounded-full bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FECACA] p-1 transition-all hover:-translate-y-2 hover:scale-105 sm:mx-0 sm:-mt-4 sm:mb-10'
                  }
                >
                  <Image
                    alt={homeData.hero.avatar.alt}
                    height={250}
                    width={250}
                    src={homeData.hero.avatar.src}
                    sizes="35vw"
                    priority
                    className="rounded-full bg-gray-50 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Button */}
          <div className="absolute bottom-4 left-1/2 z-30 hidden -translate-x-1/2 transform sm:bottom-8 sm:block">
            <button
              onClick={() =>
                document.getElementById('workExperience')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="flex animate-bounce items-center gap-3 rounded-full bg-zinc-300 px-6 py-3 text-center font-semibold text-gray-800 transition-all hover:bg-zinc-400 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600"
            >
              <span className="text-sm font-medium">Scroll Down</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Second Fold - Timeline and Tech Stack */}
        <main className="flex flex-col justify-center px-4 md:px-8">
          <div className="z-10 mx-auto flex max-w-5xl flex-col items-start justify-center border-gray-200 bg-transparent pb-16 dark:border-gray-700">
            {/* work experience timeline */}
            <div id="workExperience" className="mb-16 w-full sm:mb-32">
              <Timeline data={timelineData} />
            </div>

            {/* tech stack */}
            <div id="techExperience" className="mb-12 w-full sm:mb-20">
              <h3 className="mb-4 text-xl font-bold tracking-tight text-black dark:text-white sm:mb-6 sm:text-2xl md:text-4xl">
                {homeData.techStack.title}
              </h3>
              <p className="mb-4 text-base text-gray-700 dark:text-gray-300 sm:mb-6 sm:text-lg">
                {homeData.techStack.description}
              </p>
              <CategorizedSkills />
            </div>
          </div>
          <Footer />
        </main>
      </Suspense>
    </div>
  );
}
