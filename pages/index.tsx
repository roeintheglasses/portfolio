import Container from '../components/Container';
import WorkCard from '../components/WorkCard';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { workEx } from '../data/workEx';
import ChipStack from 'components/ChipStack/ChipStack';
import {
  IconBrandTypescript,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandCouchdb,
  IconCpu,
  IconBrandCypress,
  IconTestPipe,
  IconBrandNodejs,
  IconBrandMongodb,
  IconBrandJavascript,
  IconServerBolt,
  IconBrandCss3,
  IconFileCode2,
  IconBook2
} from '@tabler/icons-react';

const skills = [
  {
    chipName: 'JavaScript',
    gradient: 'from-[#FFBC65] via-[#AC4C5E] to-[#f86c86]',
    icon: IconBrandJavascript
  },
  {
    chipName: 'TypeScript',
    gradient: 'from-[#382F60] via-[#A45FBE] to-[#485188]',
    icon: IconBrandTypescript
  },
  {
    chipName: 'ReactJs',
    gradient: 'from-[#f86c86] via-[#FC2947] to-[#AED2FF]',
    icon: IconBrandReact
  },
  {
    chipName: 'React Native',
    gradient: 'from-[#793FDF] via-[#7091F5] to-[#97FFF4]',
    icon: IconBrandReactNative
  },
  {
    chipName: 'Next JS',
    gradient: 'from-[#392467] via-[#A367B1] to-[#FFD1E3]',
    icon: IconBrandNextjs
  },
  {
    chipName: 'TailwindCSS',
    gradient: 'from-[#7149C6] via-[#FC2947] to-[#FE6244]',
    icon: IconBrandTailwind
  },
  {
    chipName: 'CSS',
    gradient: 'from-[#793FDF] via-[#7091F5] to-[#97FFF4]',
    icon: IconBrandCss3
  },
  {
    chipName: 'NodeJS',
    gradient: 'from-[#FFF7D4] via-[#FFD95A] to-[#C07F00]',
    icon: IconBrandNodejs
  },
  {
    chipName: 'Express',
    gradient: 'from-[#5FBDFF] via-[#96EFFF] to-[#C5FFF8]',
    icon: IconServerBolt
  },
  {
    chipName: 'Jest   ',
    gradient: 'from-[#F8DE22] via-[#F94C10] to-[#FF55BB]',
    icon: IconTestPipe
  },
  {
    chipName: 'Cypress',
    gradient: 'from-[#B6EAFA] via-[#97FFF4] to-[#FF55BB]',
    icon: IconBrandCypress
  },
  {
    chipName: 'Couchbase',
    gradient: 'from-[#FFF7D4] via-[#FFD95A] to-[#C07F00]',
    icon: IconBrandCouchdb
  },
  {
    chipName: 'MongoDB',
    gradient: 'from-[#FFBC65] via-[#AC4C5E] to-[#f86c86]',
    icon: IconBrandMongodb
  },
  {
    chipName: 'RabbitMQ',
    gradient: 'from-[#f86c86] via-[#FC2947] to-[#AED2FF]',
    icon: IconCpu
  }
];

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <div
          id="heroHome"
          className="w-full my-6 sm:my-24 flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between"
        >
          <div className="flex flex-col max-w-2xl pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Hrishikesh Jangir
            </h1>
            <h2 className="text-gray-700 text-xl dark:text-gray-200 mb-6 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400">
              SDE at{' '}
              <a href="https://adpushup.com/">
                <span className="font-semibold">Adpushup</span>
              </a>
            </h2>
            <p className="text-gray-700 text-lg dark:text-gray-300 mb-6">
              Currently taming ad-tech beasts, one bug at a time. I'm learning
              about coding, designing, building & shipping great tech products.
              Code runs my fingers, fun fuels my designs. On a Journey to build
              accessible and future-proof products that empower others.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <a
                href={
                  '//drive.google.com/file/d/1PuoWY1FFYisu46B7zFlpX0pdqGft53T1/view?usp=sharing'
                }
                target="_blank"
                rel="noopener noreferrer"
                className={
                  'flex flex-row justify-center sm:justify-start items-center gap-2 px-6 py-2 text-center font-semibold text-gray-800 dark:text-gray-200  rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-all'
                }
              >
                <IconFileCode2 />
                My Resume
              </a>
            </div>
          </div>
          <div
            className={
              '-mt-4 mb-10 transform hover:-translate-y-2 hover:scale-105 transition-all rounded-full w-max animate-gradient-xy bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FECACA] p-1'
            }
          >
            <Image
              alt="Hrishikesh Jangir"
              height={250}
              width={250}
              src="/avatar.png"
              sizes="30vw"
              priority
              className="rounded-full bg-gray-50 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90"
            />
          </div>
        </div>

        {/* tech ex */}
        <div id="workExperience" className="mb-20">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            Work Experience
          </h3>
          <div className="mt-8 flex flex-row flex-wrap gap-8 align-top justify-center w-[105vw] xs:w-[85vw] lg:w-full ">
            <WorkCard
              cardInfo={workEx.adpushup}
              isDark={true}
              gradient="from-[#B6EAFA] via-[#97FFF4] to-[#FF55BB]"
            />
            <WorkCard
              cardInfo={workEx.quikieApps}
              isDark={true}
              gradient="from-[#793FDF] via-[#97FFF4] to-[#B6EAFA]"
            />
            <WorkCard
              cardInfo={workEx.safe}
              isDark={true}
              gradient="from-[#FF55BB] via-[#FFD3A3] to-[#B6EAFA]"
            />
          </div>
        </div>

        {/* tech stack */}
        <div id="techExperience" className="mb-20">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            Tech Stack & Skills
          </h3>
          <p className="text-gray-700 text-lg dark:text-gray-300 mb-2">
            As someone who loves building things with JavaScript, I enjoy
            working in the exciting space where creativity meets practicality.
            My journey with tech is a blender full of creativity & precision
            running on high settings, and I use a bunch of really cool tools.
            Let me show you a bit of the tech stack I work with:
          </p>
          <ChipStack chipList={skills} />
        </div>

      </Container>
    </Suspense>
  );
}
