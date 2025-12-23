'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconX, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useStoriesStore } from '@/store/storiesStore';
import type { StoryPhoto } from '@/lib/types';
import { getImageUrl } from '@/sanity/lib/image';
import { formatExifForDisplay } from '@/lib/exif';

interface LightboxProps {
  photos: StoryPhoto[];
}

export default function Lightbox({ photos }: LightboxProps) {
  const { lightboxOpen, lightboxPhotoIndex, closeLightbox, nextPhoto, prevPhoto } =
    useStoriesStore();

  const currentPhoto = photos[lightboxPhotoIndex];
  const canGoNext = lightboxPhotoIndex < photos.length - 1;
  const canGoPrev = lightboxPhotoIndex > 0;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'ArrowRight':
          if (canGoNext) nextPhoto();
          break;
        case 'ArrowLeft':
          if (canGoPrev) prevPhoto();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    },
    [lightboxOpen, canGoNext, canGoPrev, nextPhoto, prevPhoto, closeLightbox]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  if (!currentPhoto) return null;

  const imageUrl = currentPhoto.image ? getImageUrl(currentPhoto.image, 1920, 1080) : null;
  const exifParts = currentPhoto.exif ? formatExifForDisplay(currentPhoto.exif) : [];

  return (
    <Dialog.Root open={lightboxOpen} onOpenChange={(open) => !open && closeLightbox()}>
      <AnimatePresence>
        {lightboxOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="text-sm text-gray-400">
                    {lightboxPhotoIndex + 1} / {photos.length}
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                      aria-label="Close lightbox"
                    >
                      <IconX className="h-6 w-6" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Main content */}
                <div className="relative flex flex-1 items-center justify-center px-4">
                  {/* Previous button */}
                  <button
                    onClick={prevPhoto}
                    disabled={!canGoPrev}
                    className={`absolute left-4 z-10 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all ${
                      canGoPrev
                        ? 'text-white hover:bg-white/20'
                        : 'cursor-not-allowed text-gray-600'
                    }`}
                    aria-label="Previous photo"
                  >
                    <IconChevronLeft className="h-6 w-6" />
                  </button>

                  {/* Image */}
                  <div className="relative max-h-[80vh] max-w-full">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={currentPhoto.caption || `Photo ${lightboxPhotoIndex + 1}`}
                        width={1920}
                        height={1080}
                        className="max-h-[80vh] w-auto object-contain"
                        priority
                      />
                    ) : (
                      <div className="flex h-64 w-64 items-center justify-center bg-gray-800 text-gray-500">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={nextPhoto}
                    disabled={!canGoNext}
                    className={`absolute right-4 z-10 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all ${
                      canGoNext
                        ? 'text-white hover:bg-white/20'
                        : 'cursor-not-allowed text-gray-600'
                    }`}
                    aria-label="Next photo"
                  >
                    <IconChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Footer with metadata */}
                <div className="p-4">
                  <div className="mx-auto max-w-2xl text-center">
                    {currentPhoto.caption && <p className="text-white">{currentPhoto.caption}</p>}
                    {currentPhoto.locationName && (
                      <p className="mt-1 text-sm text-gray-400">{currentPhoto.locationName}</p>
                    )}
                    {exifParts.length > 0 && (
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {exifParts.map((part, i) => (
                          <span
                            key={i}
                            className="rounded bg-white/10 px-2 py-1 text-xs text-gray-400"
                          >
                            {part}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
