'use client';

import Image from 'next/image';
import { IconGripVertical, IconTrash, IconMapPin, IconCamera } from '@tabler/icons-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { PhotoWithMetadata } from '@/store/createStoryStore';
import { formatExifForDisplay } from '@/lib/exif';

interface PhotoCardProps {
  photo: PhotoWithMetadata;
  index: number;
  onRemove: () => void;
  onCaptionChange?: (caption: string) => void;
  showCaption?: boolean;
}

export default function PhotoCard({
  photo,
  index,
  onRemove,
  onCaptionChange,
  showCaption = false,
}: PhotoCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: photo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const exifParts = photo.exif ? formatExifForDisplay(photo.exif) : [];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50 ${
        isDragging ? 'z-50 shadow-2xl ring-2 ring-indigo-500' : ''
      }`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute left-2 top-2 z-10 cursor-grab rounded bg-black/50 p-1 opacity-0 backdrop-blur-sm transition-opacity active:cursor-grabbing group-hover:opacity-100"
      >
        <IconGripVertical className="h-4 w-4 text-white" />
      </button>

      {/* Index badge */}
      <div className="absolute right-2 top-2 z-10 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
        {index + 1}
      </div>

      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute right-2 top-10 z-10 rounded bg-red-500/80 p-1 opacity-0 backdrop-blur-sm transition-opacity hover:bg-red-500 group-hover:opacity-100"
      >
        <IconTrash className="h-4 w-4 text-white" />
      </button>

      {/* Image */}
      <div className="relative aspect-[4/3]">
        <Image
          src={photo.previewUrl}
          alt={photo.filename}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Metadata */}
      <div className="p-3">
        <p className="truncate text-sm font-medium text-white">{photo.filename}</p>

        {/* GPS indicator */}
        {photo.coordinates && (
          <div className="mt-1 flex items-center gap-1 text-xs text-green-400">
            <IconMapPin className="h-3 w-3" />
            <span>GPS available</span>
          </div>
        )}

        {/* EXIF summary */}
        {exifParts.length > 0 && (
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
            <IconCamera className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{exifParts.slice(0, 3).join(' • ')}</span>
          </div>
        )}

        {/* Caption input */}
        {showCaption && (
          <input
            type="text"
            placeholder="Add caption..."
            value={photo.caption || ''}
            onChange={(e) => onCaptionChange?.(e.target.value)}
            className="mt-2 w-full rounded border border-gray-700 bg-gray-900 px-2 py-1 text-sm text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}
