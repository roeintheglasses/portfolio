'use client';

import { useMemo } from 'react';
import { useStoriesStore } from '@/store/storiesStore';
import type { PhotoStoryPreview } from '@/lib/types';
import { IconSortDescending, IconStar, IconX } from '@tabler/icons-react';

interface SortControlsProps {
  stories: PhotoStoryPreview[];
}

export default function SortControls({ stories }: SortControlsProps) {
  const { sortMode, setSortMode, filterTags, toggleFilterTag, setFilterTags } = useStoriesStore();

  // Extract all unique tags from stories
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    stories.forEach((story) => {
      story.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [stories]);

  // Count stories for display
  const storyCount = useMemo(() => {
    if (filterTags.length === 0) return stories.length;
    return stories.filter((story) => story.tags?.some((tag) => filterTags.includes(tag))).length;
  }, [stories, filterTags]);

  return (
    <div className="space-y-4">
      {/* Sort Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</span>
          <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() => setSortMode('chronological')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                sortMode === 'chronological'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              <IconSortDescending className="h-4 w-4" />
              Latest
            </button>
            <button
              onClick={() => setSortMode('featured')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                sortMode === 'featured'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              <IconStar className="h-4 w-4" />
              Featured
            </button>
          </div>
        </div>

        {/* Story count */}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {storyCount} {storyCount === 1 ? 'story' : 'stories'}
        </span>
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Filter:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilterTag(tag)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                filterTags.includes(tag)
                  ? 'bg-indigo-500 text-white dark:bg-indigo-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
          {filterTags.length > 0 && (
            <button
              onClick={() => setFilterTags([])}
              className="flex items-center gap-1 rounded-full px-2 py-1 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IconX className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}
