import Link from 'next/link';
import Image from 'next/image';
import { IconBrandGithub } from '@tabler/icons-react';
import { LinkPreview } from './ui/link-preview';

export default function ProjectCard({
  title,
  image,
  link = '#',
  desc,
  ProjectIcon,
  otherCta = ''
}) {
  return (
    <div className="text-gray-700 dark:text-gray-300 prose prose-lg prose-neutral prose-a:text-gray-800 dark:prose-a:text-gray-200 dark:prose-invert max-w-5xl">
      <div></div>
      <h2 className="text-3xl p-1">{title}</h2>
      <div className="flex flex-col-reverse md:flex-row gap-x-6 justify-between items-start">
        <p>
          {desc}
          <div className="flex flex-col sm:flex-row gap-8 my-6">
            <LinkPreview
              url={link}
              width={250}
              height={150}
              className="flex flex-row justify-center sm:justify-start items-center gap-2 px-6 py-2 text-center font-semibold text-gray-800 dark:text-gray-200 rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-all"
            >
              <ProjectIcon />
              Checkout
            </LinkPreview>
            <LinkPreview
              url={otherCta}
              width={250}
              height={150}
              className="flex flex-row justify-center sm:justify-start items-center gap-2 px-6 py-2 text-center font-semibold text-gray-800 dark:text-gray-200 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all"
            >
              <IconBrandGithub />
              Repo
            </LinkPreview>
          </div>
        </p>
        <Image
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl aspect-video object-cover"
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
