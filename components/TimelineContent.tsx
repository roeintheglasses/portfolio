import React from 'react';
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
      <div className="flex items-center gap-4 mb-2">
        <LinkPreview
          url={item.company.url}
          className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
          width={250}
          height={150}
        >
          {item.company.name}
        </LinkPreview>
        <img
          src={item.company.logo}
          alt={item.company.logoAlt}
          width={32}
          height={32}
          className="rounded-md object-cover h-8 w-8 shadow-sm"
        />
      </div>
      <h4 className="text-lg md:text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-6">
        {item.role}
      </h4>
      <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-6">
        {item.description}
      </p>
      <div className="max-w-sm">
        <img
          src={item.workImage.src}
          alt={item.workImage.alt}
          width={item.workImage.width}
          height={item.workImage.height}
          className="rounded-lg object-cover h-32 md:h-40 w-full shadow-lg"
        />
      </div>
    </div>
  );
};