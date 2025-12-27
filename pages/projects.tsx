import Container from 'components/Container';
import ProjectCard from 'components/ProjectCard';
import { IconEyeBolt, IconCards, IconCloud, IconDashboard, IconAntenna } from '@tabler/icons-react';

const projectList = {
  turupsgambit: {
    title: "Turup's Gambit",
    description:
      'A modern multiplayer card game built with Next.js 15, featuring real-time gameplay and medieval aesthetics. Includes sophisticated bidding systems, real-time card animations, and Frenzy Mode with special powers. Built with Supabase realtime for seamless multiplayer experience, Zustand for state management, and Framer Motion for smooth animations.',
    link: 'https://turupsgambit.roeintheglasses.dev/',
    image: '/static/images/projects/turup.jpg',
    ProjectIcon: IconCards,
    otherCta: 'https://github.com/roeintheglasses/turup-s-gambits',
    technologies: [
      'Next.js 15',
      'TypeScript',
      'Supabase',
      'Zustand',
      'Framer Motion',
      'Tailwind CSS',
      'React',
      'WebSocket',
      'PostgreSQL',
    ],
  },
  clouding: {
    title: 'Clouding',
    description:
      'A developer-first infrastructure management platform that enables visual drag-and-drop infrastructure configuration and deployment. Built with Go backend using Gin framework and PostgreSQL, frontend with Next.js 15 and React Flow. Features include infrastructure visualization, component library (web servers, databases, containers), SSH credential management, and modern glass morphism UI.',
    link: 'https://cloudingco.vercel.app/',
    image: '/static/images/projects/clouding.jpg',
    ProjectIcon: IconCloud,
    otherCta: 'https://github.com/bipoool/clouding',
    technologies: [
      'Go',
      'Gin',
      'PostgreSQL',
      'Next.js 15',
      'React Flow',
      'TypeScript',
      'Tailwind CSS',
      'Shadcn/ui',
      'AWS SDK',
      'JWT',
    ],
  },
  heimdall: {
    title: 'Heimdall',
    description:
      'Heimdall is a real-time personal dashboard for monitoring GitHub commits, Vercel deployments, and other webhook-enabled services. Built with a serverless event-driven architecture using Vercel Edge Functions, Go microservices, and Upstash QStash, it delivers fast, reliable updates via Server-Sent Events.',
    link: 'https://heimdall-ashen.vercel.app/',
    image: '/static/images/projects/heimdall.png',
    ProjectIcon: IconDashboard,
    otherCta: 'https://github.com/roeintheglasses/heimdall',
    technologies: [
      'Next.js 15',
      'Go',
      'PostgreSQL',
      'Vercel Edge Functions',
      'Upstash QStash',
      'Server-Sent Events',
      'Docker',
      'TypeScript',
      'Tailwind CSS',
    ],
  },
  portfolio: {
    title: 'roeintheglasses',
    description:
      'roeintheglasses is my personal portfolio built with React & NextJS 13. It uses a PlanetScale database with a Prisma ORM layer, deployed on Vercel.',
    link: 'https://roeintheglasses.dev/',
    image: '/static/images/projects/roeintheglasses.png',
    ProjectIcon: IconEyeBolt,
    otherCta: 'https://github.com/roeintheglasses/',
    technologies: [
      'Next.js 13',
      'React',
      'TypeScript',
      'Prisma',
      'PlanetScale',
      'NextAuth.js',
      'Tailwind CSS',
      'Vercel',
    ],
  },
  valpapers: {
    title: 'Valpapers',
    description:
      'Valpapers is React-Native based Android app with a corresponding NextJS based web-app that allows users to download latest high-quality valorant wallpapers. Behind the scenes it uses a custom python service based on Real-ESRGAN algorithm to upscale the wallpapers to high quality. It also uses AWS S3 for bulk wallpaper storage with a AWS Cloudfront CDN and Route 53 DNS.',
    link: 'https://valpapers-site.vercel.app/',
    linkImage: '/static/images/projects/valpapers.png',
    image: '/static/images/projects/valpapers.png',
    ProjectIcon: IconEyeBolt,
    otherCta: 'https://github.com/roeintheglasses/valpapers/',
    technologies: [
      'React Native',
      'Next.js',
      'Python',
      'Real-ESRGAN',
      'AWS S3',
      'CloudFront',
      'Route 53',
      'TypeScript',
      'Expo',
    ],
  },
  homer: {
    title: 'Homer',
    description:
      'Homer is a currency recognition system (CRS) based on the Accelerated-KAZE (AKAZE) algorithm. Its PoC utilizes a Python based OpenCV service for computer vision processing.',
    link: 'https://ieeexplore.ieee.org/document/9214204',
    image: '/static/images/projects/homer.png',
    ProjectIcon: IconEyeBolt,
    otherCta: 'https://github.com/roeintheglasses/homer-v2',
    technologies: [
      'Python',
      'OpenCV',
      'AKAZE Algorithm',
      'Computer Vision',
      'Image Processing',
      'Machine Learning',
    ],
  },
  entercomm: {
    title: 'Enter-Comm',
    description:
      'An Android bike intercom app that creates a mesh network using WiFi Direct for offline voice communication between cyclists. Features real-time audio over 100-200m ranges, multi-hop routing for extended coverage, and dynamic network healing when devices move in/out of range. Built with Kotlin, Jetpack Compose, and Android WiFi P2P APIs.',
    link: 'https://github.com/roeintheglasses/enter-comm',
    image: '/static/images/projects/entercomm.png',
    ProjectIcon: IconAntenna,
    otherCta: 'https://github.com/roeintheglasses/enter-comm',
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Android',
      'WiFi Direct',
      'Mesh Networking',
      'Real-time Audio',
      'MVVM',
      'Coroutines',
    ],
  },
};
export default function Projects() {
  return (
    <Container
      title="Projects - Hrishikesh Jangir"
      description="All the info you can need about the projects I've built recently."
    >
      <div className="mx-auto mb-16 max-w-5xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Projects
        </h1>
        <div className="text-l prose prose-lg prose-neutral max-w-5xl text-gray-700 dark:prose-invert prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:text-gray-300 dark:prose-a:text-gray-200 dark:hover:prose-a:text-blue-400">
          <p>
            Here are some projects I've built over the years - ranging from multiplayer games and
            infrastructure platforms to mobile apps and AI experiments. Each one taught me something
            new about building scalable systems, working with different tech stacks, or solving
            interesting problems. Currently working on real-time multiplayer experiences and
            developer tooling. Feel free to check out the live demos and source code.
          </p>
          <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
            <ProjectCard
              title={projectList.heimdall.title}
              image={projectList.heimdall.image}
              link={projectList.heimdall.link}
              ProjectIcon={projectList.heimdall.ProjectIcon}
              desc={projectList.heimdall.description}
              otherCta={projectList.heimdall.otherCta}
              technologies={projectList.heimdall.technologies}
            />
            <ProjectCard
              title={projectList.entercomm.title}
              image={projectList.entercomm.image}
              link={projectList.entercomm.link}
              ProjectIcon={projectList.entercomm.ProjectIcon}
              desc={projectList.entercomm.description}
              otherCta={projectList.entercomm.otherCta}
              technologies={projectList.entercomm.technologies}
            />
            <ProjectCard
              title={projectList.turupsgambit.title}
              image={projectList.turupsgambit.image}
              link={projectList.turupsgambit.link}
              ProjectIcon={projectList.turupsgambit.ProjectIcon}
              desc={projectList.turupsgambit.description}
              otherCta={projectList.turupsgambit.otherCta}
              technologies={projectList.turupsgambit.technologies}
            />
            <ProjectCard
              title={projectList.clouding.title}
              image={projectList.clouding.image}
              link={projectList.clouding.link}
              ProjectIcon={projectList.clouding.ProjectIcon}
              desc={projectList.clouding.description}
              otherCta={projectList.clouding.otherCta}
              technologies={projectList.clouding.technologies}
            />
            <ProjectCard
              title={projectList.valpapers.title}
              image={projectList.valpapers.image}
              link={projectList.valpapers.link}
              ProjectIcon={projectList.valpapers.ProjectIcon}
              desc={projectList.valpapers.description}
              otherCta={projectList.valpapers.otherCta}
              technologies={projectList.valpapers.technologies}
            />
            <ProjectCard
              title={projectList.portfolio.title}
              image={projectList.portfolio.image}
              link={projectList.portfolio.link}
              ProjectIcon={projectList.portfolio.ProjectIcon}
              desc={projectList.portfolio.description}
              otherCta={projectList.portfolio.otherCta}
              technologies={projectList.portfolio.technologies}
            />
            <ProjectCard
              title={projectList.homer.title}
              image={projectList.homer.image}
              link={projectList.homer.link}
              ProjectIcon={projectList.homer.ProjectIcon}
              desc={projectList.homer.description}
              otherCta={projectList.homer.otherCta}
              technologies={projectList.homer.technologies}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
