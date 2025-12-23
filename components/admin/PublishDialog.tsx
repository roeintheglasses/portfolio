'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconCheck, IconExternalLink, IconLoader2 } from '@tabler/icons-react';
import { useCreateStoryStore } from '@/store/createStoryStore';

interface PublishDialogProps {
  onPublish: (options: { published: boolean; featured: boolean }) => Promise<string | null>;
}

export default function PublishDialog({ onPublish }: PublishDialogProps) {
  const { metadata, photos, isPublishing, isUploading } = useCreateStoryStore();
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async () => {
    setError(null);
    try {
      const slug = await onPublish({ published, featured });
      if (slug) {
        setCreatedSlug(slug);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish');
    }
  };

  const isLoading = isPublishing || isUploading;

  // Success state
  if (createdSlug) {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
          <IconCheck className="h-6 w-6 text-green-400" />
        </div>
        <h3 className="text-lg font-medium text-white">Story Published!</h3>
        <p className="mt-2 text-sm text-gray-400">
          Your photo story is now {published ? 'live' : 'saved as a draft'}.
        </p>
        <div className="mt-4 flex flex-col items-center gap-2">
          <Link
            href={`/journal/${createdSlug}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            View Story <IconExternalLink className="h-4 w-4" />
          </Link>
          <Link href="/stories" className="text-sm text-gray-400 hover:text-gray-300">
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h3 className="font-medium text-white">{metadata.title || 'Untitled Story'}</h3>
        <p className="mt-1 text-sm text-gray-400">
          {photos.length} photo{photos.length !== 1 ? 's' : ''} •{' '}
          {metadata.locationName || 'No location'}
        </p>
        {metadata.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Publish options */}
      <div className="space-y-4">
        <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 p-4 hover:bg-gray-800/50">
          <div>
            <p className="font-medium text-white">Publish immediately</p>
            <p className="text-sm text-gray-400">Make the story visible on Stories</p>
          </div>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-5 w-5 rounded border-gray-600 bg-gray-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900"
          />
        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 p-4 hover:bg-gray-800/50">
          <div>
            <p className="font-medium text-white">Featured story</p>
            <p className="text-sm text-gray-400">Highlight this story on the homepage</p>
          </div>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-5 w-5 rounded border-gray-600 bg-gray-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900"
          />
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handlePublish}
          disabled={isLoading}
          className="flex-1 rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <IconLoader2 className="h-4 w-4 animate-spin" />
              {isUploading ? 'Uploading photos...' : 'Publishing...'}
            </span>
          ) : published ? (
            'Publish Story'
          ) : (
            'Save as Draft'
          )}
        </button>
      </div>
    </div>
  );
}
