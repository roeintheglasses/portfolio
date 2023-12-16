import BlogPostCard from '../components/BlogPostCard';
import Container from '../components/Container';
import WorkCard from '../components/WorkCard/WorkCard';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

let cardInfo = {
  role: 'your role',
  company: 'Facebook',
  companylogo: require('public/avatar.jpg'),
  date: 'June xxxx – Present',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  descBullets: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  ]
};

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-center items-start max-w-5xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className="w-full flex flex-col-reverse sm:flex-row items-start justify-between">
            <div className="flex flex-col max-w-2xl pr-8">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
                Hrishikesh Jangir
              </h1>
              <h2 className="text-gray-700 text-xl dark:text-gray-200 mb-4">
                SDE at <span className="font-semibold">Zelto</span>
              </h2>
              <p className="text-gray-600 text-l dark:text-gray-400 mb-16">
                Solving ad-tech problems at scale, one bugfix at a time.I'm
                learning about designing, building & shipping great tech
                products.I code for passion & design for fun.
              </p>
            </div>
            <div className="w-[300px] sm:w-[176px] relative mr-10 mb-10 sm:mb-0">
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
            <div className="flex gap-6 flex-col md:flex-row">
              <WorkCard
                cardInfo={cardInfo}
                isDark={true}
                gradient="from-[#D8B4FE] to-[#818CF8]"
              />
              <WorkCard
                cardInfo={cardInfo}
                isDark={true}
                gradient="from-[#D8B4FE] to-[#818CF8]"
              />
            </div>

            {/* <Link href="/blog">
              <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
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
              </a>
            </Link> */}
          </div>

          {/* tech ex */}
          <div className="mb-20">
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
              My Recent Posts
            </h3>
            <div className="flex gap-6 flex-col md:flex-row">
              <BlogPostCard
                title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
                slug="style-guides-component-libraries-design-systems"
                gradient="from-[#D8B4FE] to-[#818CF8]"
              />
              <BlogPostCard
                title="Rust Is The Future of JavaScript Infrastructure"
                slug="rust"
                gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
              />
              <BlogPostCard
                title="Past, Present, and Future of React State Management"
                slug="react-state-management"
                gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
              />
            </div>
            <Link href="/blog">
              <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
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
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </Suspense>
  );
}
