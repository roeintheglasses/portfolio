'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconCamera,
  IconAperture,
  IconClock,
  IconMapPin,
} from '@tabler/icons-react';
import type { WalkPhoto, SanityImageAssetExpanded } from '@/lib/types';

interface PhotoDetailModalProps {
  photo: WalkPhoto;
  walkTitle?: string;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotoDetailModal({
  photo,
  walkTitle,
  currentIndex,
  totalPhotos,
  onClose,
  onNext,
  onPrev,
}: PhotoDetailModalProps) {
  const asset = photo.image?.asset as SanityImageAssetExpanded | undefined;
  const imageUrl = asset?.url;
  const lqip = asset?.metadata?.lqip;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!imageUrl) return null;

  const exif = photo.exif;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Close"
        >
          <IconX className="h-6 w-6" />
        </button>

        {/* Photo counter */}
        <div className="absolute left-4 top-4 text-sm text-white/60">
          {currentIndex + 1} / {totalPhotos}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Previous photo"
        >
          <IconChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Next photo"
        >
          <IconChevronRight className="h-6 w-6" />
        </button>

        {/* Main content */}
        <div className="flex h-full w-full max-w-7xl flex-col items-center justify-center px-16 py-20">
          {/* Image */}
          <motion.div
            key={photo._key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[70vh] w-full"
          >
            <Image
              src={imageUrl}
              alt={photo.caption || 'Photo'}
              width={1920}
              height={1080}
              className="mx-auto max-h-[70vh] w-auto rounded-lg object-contain"
              placeholder={lqip ? 'blur' : 'empty'}
              blurDataURL={lqip}
              priority
            />
          </motion.div>

          {/* Photo info panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 w-full max-w-3xl"
          >
            {/* Caption */}
            {photo.caption && (
              <p className="mb-4 text-center text-lg text-white">{photo.caption}</p>
            )}

            {/* EXIF Data Grid */}
            {exif && (
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                {/* Camera */}
                {exif.camera && (
                  <div className="flex items-center gap-2">
                    <IconCamera className="h-4 w-4 text-indigo-400" />
                    <span>{exif.camera}</span>
                  </div>
                )}

                {/* Lens */}
                {exif.lens && (
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">lens</span>
                    <span>{exif.lens}</span>
                  </div>
                )}

                {/* Aperture */}
                {exif.aperture && (
                  <div className="flex items-center gap-2">
                    <IconAperture className="h-4 w-4 text-indigo-400" />
                    <span>{exif.aperture}</span>
                  </div>
                )}

                {/* Shutter Speed */}
                {exif.shutter && (
                  <div className="flex items-center gap-2">
                    <IconClock className="h-4 w-4 text-indigo-400" />
                    <span>{exif.shutter}</span>
                  </div>
                )}

                {/* ISO */}
                {exif.iso && (
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">ISO</span>
                    <span>{exif.iso}</span>
                  </div>
                )}

                {/* Focal Length */}
                {exif.focalLength && (
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">focal</span>
                    <span>{exif.focalLength}</span>
                  </div>
                )}
              </div>
            )}

            {/* Location */}
            {photo.locationName && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <IconMapPin className="h-4 w-4" />
                <span>{photo.locationName}</span>
              </div>
            )}

            {/* Date */}
            {exif?.takenAt && (
              <p className="mt-2 text-center text-xs text-gray-600">
                {new Date(exif.takenAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
          </motion.div>
        </div>

        {/* Walk title at bottom */}
        {walkTitle && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-600">
            {walkTitle}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
