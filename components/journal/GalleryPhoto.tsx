'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import type { WalkPhoto, SanityImageAssetExpanded } from '@/lib/types';

interface GalleryPhotoProps {
  photo: WalkPhoto;
  onClick: () => void;
  priority?: boolean;
}

export default function GalleryPhoto({ photo, onClick, priority = false }: GalleryPhotoProps) {
  const asset = photo.image?.asset as SanityImageAssetExpanded | undefined;
  const imageUrl = asset?.url;
  const lqip = asset?.metadata?.lqip;
  const dimensions = asset?.metadata?.dimensions;

  if (!imageUrl) return null;

  // Calculate aspect ratio for proper sizing
  const aspectRatio = dimensions ? dimensions.width / dimensions.height : 1.5;

  return (
    <motion.div
      className="group relative mb-4 cursor-pointer break-inside-avoid overflow-hidden rounded-lg"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ aspectRatio }}>
        <Image
          src={imageUrl}
          alt={photo.caption || 'Photo'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder={lqip ? 'blur' : 'empty'}
          blurDataURL={lqip}
          priority={priority}
        />
      </div>

      {/* EXIF Overlay - appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          {/* Camera info */}
          {photo.exif?.camera && <p className="text-sm font-medium">{photo.exif.camera}</p>}
          {photo.exif?.lens && <p className="text-xs text-gray-300">{photo.exif.lens}</p>}

          {/* Settings row */}
          {(photo.exif?.aperture || photo.exif?.shutter || photo.exif?.iso) && (
            <p className="mt-1 text-xs text-gray-400">
              {[
                photo.exif.aperture,
                photo.exif.shutter,
                photo.exif.iso ? `ISO ${photo.exif.iso}` : null,
                photo.exif.focalLength,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}

          {/* Caption */}
          {photo.caption && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-200">{photo.caption}</p>
          )}

          {/* Location */}
          {photo.locationName && (
            <p className="mt-1 text-xs text-indigo-300">{photo.locationName}</p>
          )}
        </div>
      </div>

      {/* Click indicator */}
      <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
