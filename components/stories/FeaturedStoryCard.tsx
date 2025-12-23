'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useStoriesStore } from '@/store/storiesStore';
import type { PhotoStoryPreview } from '@/lib/types';
import { IconMapPin, IconPhoto, IconCalendar, IconStar } from '@tabler/icons-react';

interface FeaturedStoryCardProps {
  story: PhotoStoryPreview;
  isHighlighted?: boolean;
}

export default function FeaturedStoryCard({ story, isHighlighted }: FeaturedStoryCardProps) {
  const { hoveredStoryId, setHoveredStory } = useStoriesStore();
  const isHovered = hoveredStoryId === story._id;

  const formattedDate = story.date
    ? new Date(story.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.25 }}>
      <Link
        href={`/journal/${story.slug}`}
        className="group block h-full"
        onMouseEnter={() => setHoveredStory(story._id)}
        onMouseLeave={() => setHoveredStory(null)}
      >
        {/* Glassmorphism Card - Larger format */}
        <div
          className={`relative h-full overflow-hidden rounded-2xl border border-white/50 bg-white/60 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800/60 ${
            isHovered || isHighlighted
              ? 'border-indigo-200 shadow-2xl ring-2 ring-indigo-500 ring-offset-4 ring-offset-gray-50 dark:border-indigo-800 dark:ring-offset-gray-900'
              : 'hover:border-gray-200 hover:shadow-2xl dark:hover:border-gray-600'
          } `}
        >
          {/* Image - 16:9 aspect ratio for featured cards */}
          <div className="relative aspect-[16/9] overflow-hidden">
            {story.coverImageUrl ? (
              <Image
                src={story.coverImageUrl + '?w=800&h=450&fit=crop'}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder={story.coverImageLqip ? 'blur' : 'empty'}
                blurDataURL={story.coverImageLqip}
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                <IconPhoto className="h-16 w-16 text-gray-400 dark:text-gray-600" />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Featured badge */}
            <div className="absolute left-4 top-4">
              <span className="flex items-center gap-1.5 rounded-full bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white shadow-lg">
                <IconStar className="h-4 w-4" />
                Featured
              </span>
            </div>

            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="line-clamp-2 text-2xl font-bold text-white drop-shadow-lg">
                {story.title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <IconMapPin className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                {story.location.name}
              </span>

              {story.photoCount > 0 && (
                <span className="flex items-center gap-1.5">
                  <IconPhoto className="h-4 w-4" />
                  {story.photoCount} photos
                </span>
              )}

              {formattedDate && (
                <span className="flex items-center gap-1.5">
                  <IconCalendar className="h-4 w-4" />
                  {formattedDate}
                </span>
              )}
            </div>

            {/* Summary - always visible on featured cards */}
            {story.summary && (
              <p className="mt-3 line-clamp-3 text-gray-600 dark:text-gray-300">{story.summary}</p>
            )}

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Read more indicator */}
            <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <span>View story</span>
              <motion.span
                className="ml-1"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                &rarr;
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
