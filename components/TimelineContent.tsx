import React from 'react';
import Image from 'next/image';
import { LinkPreview } from './ui/link-preview';

interface WorkExperienceItem {
  title: string;
  company: {
    name: string;
    url: string;
    logo: string;
    logoAlt: string;
  };
  role: string;
  description: string;
  workImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface TimelineContentProps {
  item: WorkExperienceItem;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({ item }) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-4">
        <LinkPreview
          url={item.company.url}
          className="text-xl font-bold text-gray-800 transition-colors hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 md:text-2xl"
          width={250}
          height={150}
        >
          {item.company.name}
        </LinkPreview>
        <Image
          src={item.company.logo}
          alt={item.company.logoAlt}
          width={32}
          height={32}
          className="rounded-md object-cover shadow-sm"
        />
      </div>
      <h4 className="mb-6 text-lg font-semibold text-neutral-600 dark:text-neutral-400 md:text-xl">
        {item.role}
      </h4>
      <p className="mb-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-lg">
        {item.description}
      </p>
      <div className="relative h-32 max-w-sm md:h-56">
        <Image
          src={item.workImage.src}
          alt={item.workImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="rounded-lg object-cover shadow-lg"
        />
      </div>
    </div>
  );
};
