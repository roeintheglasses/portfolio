import Image from 'next/image';
import { IconBrandGithub } from '@tabler/icons-react';
import { LinkPreview } from './ui/link-preview';
import { ComponentType } from 'react';

interface ProjectCardProps {
  title: string;
  image: string;
  link?: string;
  desc: string;
  ProjectIcon: ComponentType;
  otherCta?: string;
  technologies?: string[];
}

export default function ProjectCard({
  title,
  image,
  link = '#',
  desc,
  ProjectIcon,
  otherCta = '',
  technologies = [],
}: ProjectCardProps) {
  return (
    <div className="prose prose-lg prose-neutral max-w-5xl text-gray-700 dark:prose-invert prose-a:text-gray-800 dark:text-gray-300 dark:prose-a:text-gray-200">
      <h2 className="p-1 text-3xl">{title}</h2>
      <div className="flex flex-col-reverse items-start justify-between gap-x-6 md:flex-row">
        <p>
          {desc}
          <div className="my-6 flex flex-col gap-8 sm:flex-row">
            <LinkPreview
              url={link}
              width={250}
              height={150}
              className="flex flex-row items-center justify-center gap-2 rounded-full bg-zinc-300 px-6 py-2 text-center font-semibold text-gray-800 transition-all hover:bg-zinc-400 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600 sm:justify-start"
            >
              <ProjectIcon />
              Checkout
            </LinkPreview>
            <LinkPreview
              url={otherCta}
              width={250}
              height={150}
              className="flex flex-row items-center justify-center gap-2 rounded-full border border-zinc-200 px-6 py-2 text-center font-semibold text-gray-800 transition-all hover:bg-zinc-300 dark:border-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700 sm:justify-start"
            >
              <IconBrandGithub />
              Repo
            </LinkPreview>
          </div>
          {technologies && technologies.length > 0 && (
            <div className="mt-4">
              <h5 className="mb-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Technologies:
              </h5>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </p>
        <Image
          className="aspect-video rounded-xl border border-zinc-200 object-cover dark:border-zinc-800"
          src={image}
          width={380}
          height={214}
          sizes="50vw"
          alt={title}
        />
      </div>
    </div>
  );
}
