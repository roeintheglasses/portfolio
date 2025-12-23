'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStoriesStore } from '@/store/storiesStore';
import type { PhotoStoryPreview } from '@/lib/types';
import StoryCard from './StoryCard';
import FeaturedStoryCard from './FeaturedStoryCard';
import { IconPhotoOff } from '@tabler/icons-react';

interface StoriesGridProps {
  stories: PhotoStoryPreview[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1] as const, // easeOut cubic bezier
    },
  },
};

export default function StoriesGrid({ stories }: StoriesGridProps) {
  const { sortMode, filterTags, selectedStoryId } = useStoriesStore();

  // Sort and filter stories
  const processedStories = useMemo(() => {
    let result = [...stories];

    // Filter by tags if any selected
    if (filterTags.length > 0) {
      result = result.filter((story) => story.tags?.some((tag) => filterTags.includes(tag)));
    }

    // Sort by mode
    if (sortMode === 'featured') {
      result.sort((a, b) => {
        // Featured stories first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then by date
        return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
      });
    } else {
      // Chronological - newest first
      result.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
    }

    return result;
  }, [stories, sortMode, filterTags]);

  // Separate featured stories for hero section
  const featuredStories = useMemo(() => {
    if (sortMode !== 'featured') return [];
    return processedStories.filter((s) => s.featured).slice(0, 2);
  }, [processedStories, sortMode]);

  const regularStories = useMemo(() => {
    if (sortMode !== 'featured') return processedStories;
    // If in featured mode, exclude the featured stories that are shown in hero section
    const featuredIds = new Set(featuredStories.map((s) => s._id));
    return processedStories.filter((s) => !featuredIds.has(s._id));
  }, [processedStories, sortMode, featuredStories]);

  if (processedStories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white/50 py-16 text-center backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
        <IconPhotoOff className="h-16 w-16 text-gray-400 dark:text-gray-600" />
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No stories found</h3>
        <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
          {filterTags.length > 0
            ? 'Try adjusting your filters to see more stories.'
            : 'Check back later for new photo stories.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Section */}
      {sortMode === 'featured' && featuredStories.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Featured Stories
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {featuredStories.map((story) => (
              <motion.div key={story._id} variants={itemVariants}>
                <FeaturedStoryCard story={story} isHighlighted={selectedStoryId === story._id} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Regular Stories Grid */}
      <section>
        {sortMode === 'featured' && featuredStories.length > 0 && regularStories.length > 0 && (
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">All Stories</h2>
        )}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {regularStories.map((story) => (
              <motion.div key={story._id} variants={itemVariants} layout>
                <StoryCard story={story} isHighlighted={selectedStoryId === story._id} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
