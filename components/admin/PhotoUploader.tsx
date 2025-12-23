'use client';

import { useCallback, useState } from 'react';
import { IconUpload, IconPhoto } from '@tabler/icons-react';
import { useCreateStoryStore } from '@/store/createStoryStore';
import { extractAllImageMetadata } from '@/lib/exif';

interface PhotoUploaderProps {
  onPhotosAdded?: () => void;
}

export default function PhotoUploader({ onPhotosAdded }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { addPhotos, updatePhoto, setIsExtracting } = useCreateStoryStore();

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));

      if (imageFiles.length === 0) return;

      // Add photos to store (creates preview URLs)
      addPhotos(imageFiles);
      onPhotosAdded?.();

      // Extract EXIF data for each photo
      setIsExtracting(true);

      const store = useCreateStoryStore.getState();
      const newPhotos = store.photos.slice(-imageFiles.length);

      await Promise.all(
        newPhotos.map(async (photo) => {
          const { exif, gps } = await extractAllImageMetadata(photo.file);
          updatePhoto(photo.id, {
            exif: exif || undefined,
            coordinates: gps || undefined,
          });
        })
      );

      setIsExtracting(false);
    },
    [addPhotos, updatePhoto, setIsExtracting, onPhotosAdded]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files);
      }
    },
    [processFiles]
  );

  return (
    <div
      className={`relative rounded-xl border-2 border-dashed p-8 transition-colors ${
        isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-gray-600'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <div className="flex flex-col items-center gap-4 text-center">
        <div className={`rounded-full p-4 ${isDragging ? 'bg-indigo-500/20' : 'bg-gray-800'}`}>
          {isDragging ? (
            <IconPhoto className="h-8 w-8 text-indigo-400" />
          ) : (
            <IconUpload className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-lg font-medium text-white">
            {isDragging ? 'Drop photos here' : 'Drag and drop photos'}
          </p>
          <p className="mt-1 text-sm text-gray-400">or click to browse from your computer</p>
        </div>
        <p className="text-xs text-gray-500">
          EXIF data and GPS coordinates will be extracted automatically
        </p>
      </div>
    </div>
  );
}
