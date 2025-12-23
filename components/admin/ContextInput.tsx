'use client';

import { useEffect, useMemo } from 'react';
import { IconCalendar, IconTag } from '@tabler/icons-react';
import { useCreateStoryStore } from '@/store/createStoryStore';
import LocationInput from './LocationInput';

const MOOD_OPTIONS = [
  { value: 'contemplative', label: 'Contemplative', description: 'Quiet, reflective moments' },
  { value: 'vibrant', label: 'Vibrant', description: 'Full of life and energy' },
  { value: 'nostalgic', label: 'Nostalgic', description: 'Memories of the past' },
  { value: 'adventurous', label: 'Adventurous', description: 'Discovery and exploration' },
  { value: 'serene', label: 'Serene', description: 'Peaceful and calm' },
  { value: 'urban', label: 'Urban', description: 'City life and architecture' },
  { value: 'natural', label: 'Natural', description: 'Nature and landscapes' },
  { value: 'intimate', label: 'Intimate', description: 'Close and personal' },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function ContextInput() {
  const { photos, metadata, context, setMetadata, setContext } = useCreateStoryStore();

  // Auto-populate date from first photo's EXIF if available
  const firstPhotoDate = useMemo(() => {
    const firstPhoto = photos[0];
    if (firstPhoto?.exif?.takenAt) {
      return firstPhoto.exif.takenAt.split('T')[0];
    }
    return null;
  }, [photos]);

  // Set defaults on mount
  useEffect(() => {
    if (firstPhotoDate && !metadata.date) {
      setMetadata({ date: firstPhotoDate });
    }
  }, [firstPhotoDate, metadata.date, setMetadata]);

  // Auto-generate slug from title
  useEffect(() => {
    if (metadata.title) {
      setMetadata({ slug: generateSlug(metadata.title) });
    }
  }, [metadata.title, setMetadata]);

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = e.currentTarget;
      const tag = input.value.trim().toLowerCase();
      if (tag && !metadata.tags.includes(tag)) {
        setMetadata({ tags: [...metadata.tags, tag] });
        input.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setMetadata({ tags: metadata.tags.filter((t) => t !== tagToRemove) });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Story Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={metadata.title}
          onChange={(e) => setMetadata({ title: e.target.value })}
          placeholder="Evening stroll through the old town"
          className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
        />
        {metadata.slug && (
          <p className="mt-1 text-xs text-gray-500">URL: /journal/{metadata.slug}</p>
        )}
      </div>

      {/* Location */}
      <LocationInput />

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Date</label>
        <div className="relative mt-1">
          <IconCalendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="date"
            value={metadata.date}
            onChange={(e) => setMetadata({ date: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Mood */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Mood / Atmosphere</label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood.value}
              type="button"
              onClick={() => setContext({ mood: mood.value })}
              className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                context.mood === mood.value
                  ? 'border-indigo-500 bg-indigo-500/20 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              <p className="text-sm font-medium">{mood.label}</p>
              <p className="text-xs opacity-70">{mood.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Story hints */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Story Hints
          <span className="ml-2 text-xs text-gray-500">(Optional)</span>
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Help the AI understand the context and what you want to convey
        </p>
        <textarea
          value={context.storyHints}
          onChange={(e) => setContext({ storyHints: e.target.value })}
          placeholder="The light was golden as the sun set over the canals. I wanted to capture the quiet moments between the tourist crowds..."
          rows={3}
          className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Highlights */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Key Moments to Highlight
          <span className="ml-2 text-xs text-gray-500">(Optional)</span>
        </label>
        <textarea
          value={context.highlights}
          onChange={(e) => setContext({ highlights: e.target.value })}
          placeholder="Photo 3 has a cyclist passing through perfect light. Photo 7 shows the reflection in a puddle..."
          rows={2}
          className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Tags</label>
        <div className="relative mt-1">
          <IconTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Add tag and press Enter"
            onKeyDown={handleTagInput}
            className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        {metadata.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-gray-500 hover:text-red-400"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
