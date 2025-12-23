'use client';

import { useState, useCallback } from 'react';
import type { WalkPhoto } from '@/lib/types';
import GalleryPhoto from './GalleryPhoto';
import PhotoDetailModal from './PhotoDetailModal';

interface GalleryGridProps {
  photos: WalkPhoto[];
  title?: string;
}

export default function GalleryGrid({ photos, title }: GalleryGridProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handlePhotoClick = useCallback((index: number) => {
    setSelectedPhotoIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const handleNextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [photos.length]);

  const handlePrevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );
  }, [photos.length]);

  if (!photos || photos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        No photos in this gallery
      </div>
    );
  }

  return (
    <>
      {/* Masonry Grid using CSS columns */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {photos.map((photo, index) => (
          <div key={photo._key} data-photo-index={index}>
            <GalleryPhoto
              photo={photo}
              onClick={() => handlePhotoClick(index)}
              priority={index < 4}
            />
          </div>
        ))}
      </div>

      {/* Photo Detail Modal */}
      {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
        <PhotoDetailModal
          photo={photos[selectedPhotoIndex]}
          walkTitle={title}
          currentIndex={selectedPhotoIndex}
          totalPhotos={photos.length}
          onClose={handleCloseModal}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      )}
    </>
  );
}
