'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { IconMapPin, IconCalendar, IconPhoto, IconChevronDown } from '@tabler/icons-react';
import type { PhotoStory } from '@/lib/types';
import { getImageUrl } from '@/sanity/lib/image';

interface JournalHeroProps {
  story: PhotoStory;
  photoCount: number;
}

export default function JournalHero({ story, photoCount }: JournalHeroProps) {
  const coverImageUrl = story.coverImage ? getImageUrl(story.coverImage, 1920, 1080) : null;

  const formattedDate = story.date
    ? new Date(story.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background image or fallback */}
      {coverImageUrl ? (
        <div className="absolute inset-0">
          <Image
            src={coverImageUrl}
            alt={story.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/30" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-gray-900" />
      )}

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end pb-16">
        <div className="mx-auto w-full max-w-4xl px-6">
          {/* Location tag */}
          {story.location?.name && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-1 text-sm uppercase tracking-widest text-indigo-400">
                <IconMapPin className="h-4 w-4" />
                {story.location.name}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          >
            {story.title}
          </motion.h1>

          {/* Summary */}
          {story.summary && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 max-w-2xl text-lg text-gray-300"
            >
              {story.summary}
            </motion.p>
          )}

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400"
          >
            {formattedDate && (
              <span className="flex items-center gap-1">
                <IconCalendar className="h-4 w-4" />
                {formattedDate}
              </span>
            )}
            {photoCount > 0 && (
              <span className="flex items-center gap-1">
                <IconPhoto className="h-4 w-4" />
                {photoCount} photos
              </span>
            )}
          </motion.div>

          {/* Tags */}
          {story.tags && story.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white"
          aria-label="Scroll to content"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <IconChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
