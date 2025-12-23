'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useCreateStoryStore } from '@/store/createStoryStore';
import PhotoCard from './PhotoCard';

interface PhotoGridProps {
  showCaptions?: boolean;
}

export default function PhotoGrid({ showCaptions = false }: PhotoGridProps) {
  const { photos, reorderPhotos, removePhoto, updatePhoto } = useCreateStoryStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      reorderPhotos(oldIndex, newIndex);
    }
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={photos.map((p) => p.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onRemove={() => removePhoto(photo.id)}
              onCaptionChange={(caption) => updatePhoto(photo.id, { caption })}
              showCaption={showCaptions}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
