'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStoriesStore } from '@/store/storiesStore';
import type { PhotoStoryPreview } from '@/lib/types';
import StoriesMap from './StoriesMap';
import StoriesGrid from './StoriesGrid';
import SortControls from './SortControls';
import { IconMap, IconChevronUp, IconChevronDown, IconMaximize } from '@tabler/icons-react';

interface StoriesLayoutProps {
  stories: PhotoStoryPreview[];
}

export default function StoriesLayout({ stories }: StoriesLayoutProps) {
  const { mapExpanded, toggleMapExpanded, setMapExpanded, fitAllStories } = useStoriesStore();

  // On mobile, default to collapsed map
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setMapExpanded(false);
    }
  }, [setMapExpanded]);

  return (
    <div className="space-y-6">
      {/* Collapsible Map Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Map Toggle Header */}
        <button
          onClick={toggleMapExpanded}
          className="flex w-full items-center justify-between bg-gray-100 px-4 py-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <span className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
            <IconMap className="h-5 w-5" />
            Explore on Map
          </span>
          <motion.span animate={{ rotate: mapExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <IconChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </motion.span>
        </button>

        {/* Collapsible Map Container */}
        <AnimatePresence initial={false}>
          {mapExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative overflow-hidden"
            >
              {/* Map */}
              <div className="h-[40vh] min-h-[300px]">
                <StoriesMap stories={stories} />
              </div>

              {/* Map Controls Overlay */}
              <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                <button
                  onClick={fitAllStories}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:border-gray-600 dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <IconMaximize className="h-4 w-4" />
                  <span className="hidden sm:inline">Fit All</span>
                </button>
              </div>

              {/* Subtle hint text */}
              <div className="absolute bottom-4 left-4 z-10">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Click markers to view stories
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort/Filter Controls */}
      <SortControls stories={stories} />

      {/* Stories Grid */}
      <StoriesGrid stories={stories} />
    </div>
  );
}
