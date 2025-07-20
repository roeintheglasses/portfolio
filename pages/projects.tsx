import Container from 'components/Container';
import ProjectCard from 'components/ProjectCard';
import { IconEyeBolt } from '@tabler/icons-react';

let projectList = {
  valpapers: {
    title: 'Valpapers',
    description:
      'Valpapers is React-Native based Android app with a corresponding NextJS based web-app that allows users to download latest high-quality valorant wallpapers. Behind the scenes it uses a custom python service based on Real-ESRGAN algorithm to upscale the wallpapers to high quality. It also uses AWS S3 for bulk wallpaper storage with a AWS Cloudfront CDN and Route 53 DNS.',
    link: 'https://valpapers-site.vercel.app/',
    linkImage: '/static/images/projects/valpapers.png',
    image: '/static/images/projects/valpapers.png',
    ProjectIcon: IconEyeBolt,
    otherCta: 'https://github.com/roeintheglasses/valpapers/'
  },
  portfolio: {
    title: 'roeintheglasses',
    description:
      'roeintheglasses is my personal portfolio built with React & NextJS 13. It uses a PlanetScale database with a Prisma ORM layer, deployed on Vercel.',
    link: 'https://roeintheglasses.dev/',
    image: '/static/images/projects/roeintheglasses.png',
    ProjectIcon: IconEyeBolt,
    otherCta: 'https://github.com/roeintheglasses/'
  },
  homer: {
    title: 'Homer',
    description:
      'Homer is a currency recognition system (CRS) based on the Accelerated-KAZE (AKAZE) algorithm. Its PoC utilizes a Python based OpenCV service for computer vision processing.',
    link: 'https://ieeexplore.ieee.org/document/9214204',
    image: '/static/images/projects/homer.png',
    ProjectIcon: IconEyeBolt,
    otherCta: 'https://github.com/roeintheglasses/homer-v2'
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
            Hey there! Welcome to my Project Playground! 🚀 As a Full Stack
            developer, I'm all about turning cool ideas into digital reality.
            Scroll through these projects to see the fun stuff I've built - from
            websites that look slick to behind-the-scenes magic that makes
            everything work. Each project is like a digital adventure, and I
            can't wait to show you around. Click on any project to see the tech
            I played with, the challenges I faced (and conquered!), and the
            awesome results. Let's dive in and geek out together! 🤓✨
          </p>
          <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
            <ProjectCard
              title={projectList.valpapers.title}
              image={projectList.valpapers.image}
              link={projectList.valpapers.link}
              ProjectIcon={projectList.valpapers.ProjectIcon}
              desc={projectList.valpapers.description}
              otherCta={projectList.valpapers.otherCta}
            />
            <ProjectCard
              title={projectList.portfolio.title}
              image={projectList.portfolio.image}
              link={projectList.portfolio.link}
              ProjectIcon={projectList.portfolio.ProjectIcon}
              desc={projectList.portfolio.description}
              otherCta={projectList.portfolio.otherCta}
            />
            <ProjectCard
              title={projectList.homer.title}
              image={projectList.homer.image}
              link={projectList.homer.link}
              ProjectIcon={projectList.homer.ProjectIcon}
              desc={projectList.homer.description}
              otherCta={projectList.homer.otherCta}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
