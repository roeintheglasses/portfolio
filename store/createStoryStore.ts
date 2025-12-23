import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { ExifData, GeoPoint, CoordinateSource } from '@/lib/types';

export type CreationStep = 'upload' | 'context' | 'generate' | 'preview' | 'publish';

export interface PhotoWithMetadata {
  id: string;
  file: File;
  previewUrl: string;
  filename: string;
  exif?: ExifData;
  coordinates?: GeoPoint;
  caption?: string;
  isFullBleed?: boolean;
  // Sanity asset ref after upload
  assetRef?: string;
}

export interface StoryMetadata {
  title: string;
  slug: string;
  date: string;
  locationName: string;
  coordinates?: GeoPoint;
  coordinateSource?: CoordinateSource;
  tags: string[];
}

export interface StoryContext {
  mood: string;
  storyHints: string;
  highlights: string;
}

interface CreateStoryState {
  // Multi-step wizard state
  step: CreationStep;

  // Photos state
  photos: PhotoWithMetadata[];

  // Metadata state
  metadata: StoryMetadata;

  // Story context for AI generation
  context: StoryContext;

  // Generated content
  summary: string;
  introduction: string;

  // Loading states
  isExtracting: boolean;
  isGenerating: boolean;
  isUploading: boolean;
  isPublishing: boolean;

  // Error state
  error: string | null;

  // Actions
  setStep: (step: CreationStep) => void;

  // Photo actions
  addPhotos: (files: File[]) => void;
  updatePhoto: (id: string, updates: Partial<PhotoWithMetadata>) => void;
  removePhoto: (id: string) => void;
  reorderPhotos: (startIndex: number, endIndex: number) => void;
  setPhotoAssetRef: (id: string, assetRef: string) => void;

  // Metadata actions
  setMetadata: (metadata: Partial<StoryMetadata>) => void;

  // Context actions
  setContext: (context: Partial<StoryContext>) => void;

  // Generated content actions
  setGeneratedContent: (summary: string, introduction: string) => void;
  setSummary: (summary: string) => void;
  setIntroduction: (introduction: string) => void;

  // Loading state actions
  setIsExtracting: (isExtracting: boolean) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsUploading: (isUploading: boolean) => void;
  setIsPublishing: (isPublishing: boolean) => void;

  // Error actions
  setError: (error: string | null) => void;

  // Reset
  reset: () => void;
}

const getDefaultDate = (): string => {
  const parts = new Date().toISOString().split('T');
  return parts[0] ?? new Date().toISOString().slice(0, 10);
};

const createInitialState = () => ({
  step: 'upload' as CreationStep,
  photos: [] as PhotoWithMetadata[],
  metadata: {
    title: '',
    slug: '',
    date: getDefaultDate(),
    locationName: '',
    coordinates: undefined as GeoPoint | undefined,
    coordinateSource: undefined as CoordinateSource | undefined,
    tags: [] as string[],
  },
  context: {
    mood: '',
    storyHints: '',
    highlights: '',
  },
  summary: '',
  introduction: '',
  isExtracting: false,
  isGenerating: false,
  isUploading: false,
  isPublishing: false,
  error: null as string | null,
});

export const useCreateStoryStore = create<CreateStoryState>((set, get) => ({
  ...createInitialState(),

  setStep: (step) => set({ step }),

  addPhotos: (files) => {
    const newPhotos: PhotoWithMetadata[] = files.map((file) => ({
      id: nanoid(),
      file,
      previewUrl: URL.createObjectURL(file),
      filename: file.name,
    }));
    set((state) => ({
      photos: [...state.photos, ...newPhotos],
    }));
  },

  updatePhoto: (id, updates) => {
    set((state) => ({
      photos: state.photos.map((photo) => (photo.id === id ? { ...photo, ...updates } : photo)),
    }));
  },

  removePhoto: (id) => {
    const photo = get().photos.find((p) => p.id === id);
    if (photo) {
      URL.revokeObjectURL(photo.previewUrl);
    }
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== id),
    }));
  },

  reorderPhotos: (startIndex, endIndex) => {
    set((state) => {
      const result = Array.from(state.photos);
      const removed = result[startIndex];
      if (!removed) return state;
      result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { photos: result };
    });
  },

  setPhotoAssetRef: (id, assetRef) => {
    set((state) => ({
      photos: state.photos.map((photo) => (photo.id === id ? { ...photo, assetRef } : photo)),
    }));
  },

  setMetadata: (metadata) => {
    set((state) => ({
      metadata: { ...state.metadata, ...metadata },
    }));
  },

  setContext: (context) => {
    set((state) => ({
      context: { ...state.context, ...context },
    }));
  },

  setGeneratedContent: (summary, introduction) => {
    set({ summary, introduction });
  },

  setSummary: (summary) => set({ summary }),

  setIntroduction: (introduction) => set({ introduction }),

  setIsExtracting: (isExtracting) => set({ isExtracting }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsPublishing: (isPublishing) => set({ isPublishing }),

  setError: (error) => set({ error }),

  reset: () => {
    // Clean up preview URLs
    get().photos.forEach((photo) => {
      URL.revokeObjectURL(photo.previewUrl);
    });
    set(createInitialState());
  },
}));

// Aliases for backward compatibility
export const useCreateWalkStore = useCreateStoryStore;
export type WalkMetadata = StoryMetadata;
