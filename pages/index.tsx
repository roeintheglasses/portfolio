import Container from '../components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StarsCanvas from '../components/StarCanvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { homeData, getHomeData } from '../data/home';
import CategorizedSkills from '../components/CategorizedSkills';
import { Timeline } from '../components/ui/timeline';
import { LinkPreview } from '../components/ui/link-preview';
import { IconFileCode2 } from '@tabler/icons-react';

export default function Home() {
  const router = useRouter();
  const homeDataWithLinks = getHomeData(LinkPreview);
  const meta = {
    title: 'Hrishikesh Jangir - Developer, writer, designer.',
    description: `Front-end developer, JavaScript enthusiast, and an avid valorant player.`,
    image: 'https://roeintheglasses.dev/static/images/roe-banner.png',
    type: 'website'
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://roeintheglasses.dev${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://roeintheglasses.dev${router.asPath}`}
        />
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
      <div className="flex flex-col justify-center px-6 relative z-30">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <Navbar />
      </div>

      <Suspense fallback={null}>
        {/* First Fold - Hero Section */}
        <div className="min-h-screen md:h-screen flex flex-col relative -mt-36">
          {/* Hero Content */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-8 relative z-20 pt-36 pb-20">
            <div className="max-w-5xl w-full">
              <div
                id="heroHome"
                className="w-full flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between"
              >
                <div className="flex flex-col max-w-2xl pr-0 sm:pr-8">
                  <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight mb-1 text-black dark:text-white text-center sm:text-left">
                    {homeData.hero.name}
                  </h1>
                  <h2 className="text-gray-700 text-lg sm:text-xl md:text-2xl dark:text-gray-200 mb-6 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400 text-center sm:text-left">
                    {homeData.hero.title}{' '}
                    <LinkPreview
                      url={homeData.hero.company.url}
                      className="font-semibold text-gray-800 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                      width={250}
                      height={150}
                    >
                      {homeData.hero.company.name}
                    </LinkPreview>
                  </h2>
                  <p className="text-gray-700 text-lg sm:text-xl dark:text-gray-300 mb-6 text-center sm:text-left">
                    {homeData.hero.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 mb-8 sm:mb-16">
                    <a
                      href={homeData.hero.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        'flex flex-row justify-center sm:justify-start items-center gap-2 px-6 py-2 text-center font-semibold text-gray-800 dark:text-gray-200  rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-all'
                      }
                    >
                      <IconFileCode2 />
                      {homeData.hero.resume.text}
                    </a>
                  </div>
                </div>
                <div
                  className={
                    'mt-8 sm:-mt-4 mb-6 sm:mb-10 transform hover:-translate-y-2 hover:scale-105 transition-all rounded-full w-max animate-gradient-xy bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FECACA] p-1 mx-auto sm:mx-0'
                  }
                >
                  <Image
                    alt={homeData.hero.avatar.alt}
                    height={250}
                    width={250}
                    src={homeData.hero.avatar.src}
                    sizes="35vw"
                    priority
                    className="rounded-full bg-gray-50 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Button */}
          <div className="hidden sm:block absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <button
              onClick={() =>
                document
                  .getElementById('workExperience')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="animate-bounce flex items-center gap-3 px-6 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-all"
            >
              <span className="text-sm font-medium">Scroll Down</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
        <main id="skip" className="flex flex-col justify-center px-4 md:px-8">
          <div className="flex flex-col justify-center items-start max-w-5xl border-gray-200 dark:border-gray-700 mx-auto pb-16 bg-transparent z-10">
            {/* work experience timeline */}
            <div id="workExperience" className="mb-16 sm:mb-32 w-full">
              <Timeline data={homeDataWithLinks.workExperience.timeline} />
            </div>

            {/* tech stack */}
            <div id="techExperience" className="mb-12 sm:mb-20 w-full">
              <h3 className="font-bold text-xl sm:text-2xl md:text-4xl tracking-tight mb-4 sm:mb-6 text-black dark:text-white">
                {homeDataWithLinks.techStack.title}
              </h3>
              <p className="text-gray-700 text-base sm:text-lg dark:text-gray-300 mb-4 sm:mb-6">
                {homeDataWithLinks.techStack.description}
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
