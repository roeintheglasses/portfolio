import Container from 'components/Container';
import ProjectCard from 'components/ProjectCard';
import { IconEyeBolt, IconCards, IconCloud } from '@tabler/icons-react';

let projectList = {
  clouding: {
    title: 'Clouding',
    description:
      'A developer-first infrastructure management platform that enables visual drag-and-drop infrastructure configuration and deployment. Built with Go backend using Gin framework and PostgreSQL, frontend with Next.js 15 and React Flow. Features include infrastructure visualization, component library (web servers, databases, containers), SSH credential management, and modern glass morphism UI.',
    link: 'https://cloudingco.vercel.app/',
    image: '/static/images/projects/clouding.jpg',
    ProjectIcon: IconCloud,
    otherCta: 'https://github.com/bipoool/clouding',
    technologies: ['Go', 'Gin', 'PostgreSQL', 'Next.js 15', 'React Flow', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui', 'AWS SDK', 'JWT']
  },
  turupsgambit: {
    title: "Turup's Gambit",
    description:
      'A modern multiplayer card game built with Next.js 15, featuring real-time gameplay and medieval aesthetics. Includes sophisticated bidding systems, real-time card animations, and Frenzy Mode with special powers. Built with Supabase realtime for seamless multiplayer experience, Zustand for state management, and Framer Motion for smooth animations.',
    link: 'https://turupsgambits.vercel.app/',
    image: '/static/images/projects/turup.jpg',
    ProjectIcon: IconCards,
    otherCta: 'https://github.com/roeintheglasses/turup-s-gambits',
    technologies: ['Next.js 15', 'TypeScript', 'Supabase', 'Zustand', 'Framer Motion', 'Tailwind CSS', 'React', 'WebSocket', 'PostgreSQL']
  },
  portfolio: {
    title: 'roeintheglasses',
    description:
      'roeintheglasses is my personal portfolio built with React & NextJS 13. It uses a PlanetScale database with a Prisma ORM layer, deployed on Vercel.',
    link: 'https://roeintheglasses.dev/',
    image: '/static/images/projects/roeintheglasses.png',
    ProjectIcon: IconEyeBolt,
    otherCta: 'https://github.com/roeintheglasses/',
    technologies: ['Next.js 13', 'React', 'TypeScript', 'Prisma', 'PlanetScale', 'NextAuth.js', 'Tailwind CSS', 'Vercel']
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
    technologies: ['React Native', 'Next.js', 'Python', 'Real-ESRGAN', 'AWS S3', 'CloudFront', 'Route 53', 'TypeScript', 'Expo']
  },
  homer: {
    title: 'Homer',
    description:
      'Homer is a currency recognition system (CRS) based on the Accelerated-KAZE (AKAZE) algorithm. Its PoC utilizes a Python based OpenCV service for computer vision processing.',
    link: 'https://ieeexplore.ieee.org/document/9214204',
    image: '/static/images/projects/homer.png',
    ProjectIcon: IconEyeBolt,
    otherCta: 'https://github.com/roeintheglasses/homer-v2',
    technologies: ['Python', 'OpenCV', 'AKAZE Algorithm', 'Computer Vision', 'Image Processing', 'Machine Learning']
  }
};
export default function Projects() {
  return (
    <Container
      title="Projects - Hrishikesh Jangir"
      description="All the info you can need about the projects I've built recently."
    >
      <div className="max-w-5xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Projects
        </h1>
        <div className="text-gray-700 text-l dark:text-gray-300 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400 max-w-5xl">
          <p>
            Here are some projects I've built over the years - ranging from multiplayer 
            games and infrastructure platforms to mobile apps and AI experiments. Each one 
            taught me something new about building scalable systems, working with different 
            tech stacks, or solving interesting problems. Currently working on real-time 
            multiplayer experiences and developer tooling. Feel free to check out the live 
            demos and source code.
          </p>
          <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
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
