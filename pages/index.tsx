import BlogPostCard from '../components/BlogPostCard';
import Container from '../components/Container';
import WorkCard from '../components/WorkCard';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { workEx } from '../data/workEx';

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <div className="w-full flex flex-col-reverse sm:flex-row items-start justify-between">
          <div className="flex flex-col max-w-2xl pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Hrishikesh Jangir
            </h1>
            <h2 className="text-gray-700 text-xl dark:text-gray-200 mb-4">
              SDE at <span className="font-semibold">Adpushup</span>
            </h2>
            <p className="text-gray-700 text-lg dark:text-gray-300 mb-16">
              Currently taming ad-tech beasts, one bug at a time. I'm learning
              about coding, designing, building & shipping great tech products.
              Code runs my fingers, fun fuels my designs. On a Journey to build
              accessible and future-proof products that empower others.
            </p>
          </div>
          <div className="w-[250px] sm:w-[176px] relative mr-0  md:mr-10 mb-10 sm:mb-0">
            <Image
              alt="Hrishikesh Jangir"
              height={200}
              width={200}
              src="/avatar.png"
              sizes="30vw"
              priority
              className="rounded-full"
            />
          </div>
        </div>

        {/* tech ex */}
        <div className="mb-20">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            Work Experience
          </h3>
          <div className="mt-8 flex flex-row flex-wrap gap-8 align-top justify-center w-[105vw] xs:w-[85vw] lg:w-full ">
            <WorkCard
              cardInfo={workEx.adpushup}
              isDark={true}
              gradient="from-[#D8B4FE] to-[#818CF8]"
            />
            <WorkCard
              cardInfo={workEx.quikieApps}
              isDark={true}
              gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
            />
            <WorkCard
              cardInfo={workEx.safe}
              isDark={true}
              gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
            />
          </div>
        </div>

        {/* Blog Articles */}
        <div className="mb-20">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            My Recent Posts
          </h3>
          <div className="mt-8 flex flex-row flex-wrap align-top justify-center gap-8 w-[105vw] xs:w-[85vw] lg:w-full">
            <BlogPostCard
              title="JavaScript's Back-End Future: Why Rust is Stealing the Show & the Tools Shaping the Landscape"
              slug="javascript-s-back-end-future-is-rust"
              gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
            />
            <BlogPostCard
              title="JavaScript's Back-End Future: Why Rust is Stealing the Show & the Tools Shaping the Landscape"
              slug="javascript-s-back-end-future-is-rust"
              gradient="from-[#D8B4FE] to-[#818CF8]"
            />
            <BlogPostCard
              title="Past, Present, and Future of React State Management"
              slug="react-state-management"
              gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
            />
          </div>
          <Link
            href="/blog"
            className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
          >
            Read all posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 ml-1"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </Suspense>
  );
}
