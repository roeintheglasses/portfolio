'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useStoriesStore } from '@/store/storiesStore';
import type { PhotoStoryPreview } from '@/lib/types';
import { IconMapPin, IconPhoto, IconCalendar } from '@tabler/icons-react';

interface StoryCardProps {
  story: PhotoStoryPreview;
  isHighlighted?: boolean;
}

export default function StoryCard({ story, isHighlighted }: StoryCardProps) {
  const { hoveredStoryId, setHoveredStory } = useStoriesStore();
  const isHovered = hoveredStoryId === story._id;

  const formattedDate = story.date
    ? new Date(story.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    : null;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/journal/${story.slug}`}
        className="group block h-full"
        onMouseEnter={() => setHoveredStory(story._id)}
        onMouseLeave={() => setHoveredStory(null)}
      >
        {/* Glassmorphism Card */}
        <div
          className={`relative h-full overflow-hidden rounded-xl border border-white/50 bg-white/60 shadow-lg backdrop-blur-xl transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800/60 ${
            isHovered || isHighlighted
              ? 'border-indigo-200 shadow-xl ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-50 dark:border-indigo-800 dark:ring-offset-gray-900'
              : 'hover:border-gray-200 hover:shadow-xl dark:hover:border-gray-600'
          } `}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {story.coverImageUrl ? (
              <Image
                src={story.coverImageUrl + '?w=600&h=450&fit=crop'}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder={story.coverImageLqip ? 'blur' : 'empty'}
                blurDataURL={story.coverImageLqip}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                <IconPhoto className="h-12 w-12 text-gray-400 dark:text-gray-600" />
              </div>
            )}

            {/* Featured badge */}
            {story.featured && (
              <div className="absolute right-3 top-3">
                <span className="rounded-full bg-indigo-500/90 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {story.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <IconMapPin className="h-4 w-4" />
                <span className="max-w-[120px] truncate">{story.location.name}</span>
              </span>

              {story.photoCount > 0 && (
                <span className="flex items-center gap-1">
                  <IconPhoto className="h-4 w-4" />
                  {story.photoCount}
                </span>
              )}

              {formattedDate && (
                <span className="flex items-center gap-1">
                  <IconCalendar className="h-4 w-4" />
                  {formattedDate}
                </span>
              )}
            </div>

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {story.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {story.tags.length > 3 && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    +{story.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Summary on hover */}
            {story.summary && (
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  height: isHovered ? 'auto' : 0,
                  marginTop: isHovered ? 8 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                  {story.summary}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
