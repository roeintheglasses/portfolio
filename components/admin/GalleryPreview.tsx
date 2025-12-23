'use client';

import Image from 'next/image';
import { useCreateStoryStore } from '@/store/createStoryStore';

export default function GalleryPreview() {
  const { photos, metadata, summary, introduction, setSummary, setIntroduction } =
    useCreateStoryStore();

  return (
    <div className="space-y-6">
      {/* Story Info */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h3 className="mb-3 text-lg font-medium text-white">{metadata.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <span>{metadata.locationName}</span>
          {metadata.date && (
            <span>
              {new Date(metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          <span>{photos.length} photos</span>
        </div>
      </div>

      {/* Summary Editor */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Summary <span className="text-gray-500">(for gallery cards)</span>
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          maxLength={200}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="A brief summary of your walk..."
        />
        <p className="mt-1 text-right text-xs text-gray-500">{summary.length}/200 characters</p>
      </div>

      {/* Introduction Editor */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Introduction <span className="text-gray-500">(displayed on page)</span>
        </label>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="An introductory paragraph setting the scene..."
        />
      </div>

      {/* Photo Grid Preview */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h4 className="mb-4 text-sm font-medium text-gray-300">Photos</h4>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {photos.map((photo, index) => (
            <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src={photo.previewUrl} alt={photo.filename} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-medium text-white">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      {metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-600/20 px-3 py-1 text-xs text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
