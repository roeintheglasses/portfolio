import { create } from 'zustand';

export interface MapBounds {
  sw: [number, number]; // [lng, lat]
  ne: [number, number]; // [lng, lat]
}

export interface StoriesState {
  // Map state
  mapBounds: MapBounds | null;
  mapZoom: number;
  mapCenter: [number, number]; // [lng, lat]
  mapExpanded: boolean;

  // Selection state
  activeStoryId: string | null;
  hoveredStoryId: string | null;
  selectedStoryId: string | null; // For map-to-grid highlighting

  // View state
  viewMode: 'stories' | 'journal';
  mobileView: 'map' | 'grid';

  // Sort and filter state
  sortMode: 'chronological' | 'featured';
  filterTags: string[];

  // Journal state
  scrollProgress: number; // 0 to 1
  activePhotoIndex: number;

  // Lightbox state
  lightboxOpen: boolean;
  lightboxPhotoIndex: number;
  lightboxPhotos: string[]; // Array of photo IDs for navigation

  // Actions
  setMapBounds: (bounds: MapBounds | null) => void;
  setMapZoom: (zoom: number) => void;
  setMapCenter: (center: [number, number]) => void;
  setActiveStory: (id: string | null) => void;
  setHoveredStory: (id: string | null) => void;
  setViewMode: (mode: 'stories' | 'journal') => void;
  setScrollProgress: (progress: number) => void;
  setActivePhotoIndex: (index: number) => void;
  openLightbox: (index: number, photos?: string[]) => void;
  closeLightbox: () => void;
  nextPhoto: () => void;
  prevPhoto: () => void;
  toggleMobileView: () => void;
  flyTo: (center: [number, number], zoom?: number) => void;
  resetState: () => void;

  // New actions for redesign
  toggleMapExpanded: () => void;
  setMapExpanded: (expanded: boolean) => void;
  setSortMode: (mode: 'chronological' | 'featured') => void;
  setFilterTags: (tags: string[]) => void;
  toggleFilterTag: (tag: string) => void;
  setSelectedStory: (id: string | null) => void;
  fitAllStories: () => void;
}

const initialState = {
  mapBounds: null,
  mapZoom: 4,
  mapCenter: [78.9629, 20.5937] as [number, number], // India center
  mapExpanded: true,
  activeStoryId: null,
  hoveredStoryId: null,
  selectedStoryId: null,
  viewMode: 'stories' as const,
  mobileView: 'grid' as const,
  sortMode: 'chronological' as const,
  filterTags: [] as string[],
  scrollProgress: 0,
  activePhotoIndex: 0,
  lightboxOpen: false,
  lightboxPhotoIndex: 0,
  lightboxPhotos: [] as string[],
};

export const useStoriesStore = create<StoriesState>((set, get) => ({
  ...initialState,

  // Map actions
  setMapBounds: (bounds) => set({ mapBounds: bounds }),
  setMapZoom: (zoom) => set({ mapZoom: zoom }),
  setMapCenter: (center) => set({ mapCenter: center }),

  // Selection actions
  setActiveStory: (id) => set({ activeStoryId: id }),
  setHoveredStory: (id) => set({ hoveredStoryId: id }),

  // View actions
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleMobileView: () =>
    set((state) => ({
      mobileView: state.mobileView === 'map' ? 'grid' : 'map',
    })),

  // Journal actions
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActivePhotoIndex: (index) => set({ activePhotoIndex: index }),

  // Lightbox actions
  openLightbox: (index, photos) =>
    set({
      lightboxOpen: true,
      lightboxPhotoIndex: index,
      ...(photos && { lightboxPhotos: photos }),
    }),
  closeLightbox: () =>
    set({
      lightboxOpen: false,
    }),
  nextPhoto: () =>
    set((state) => ({
      lightboxPhotoIndex: Math.min(state.lightboxPhotoIndex + 1, state.lightboxPhotos.length - 1),
    })),
  prevPhoto: () =>
    set((state) => ({
      lightboxPhotoIndex: Math.max(state.lightboxPhotoIndex - 1, 0),
    })),

  // Navigation actions
  flyTo: (center, zoom) =>
    set({
      mapCenter: center,
      ...(zoom !== undefined && { mapZoom: zoom }),
    }),

  // Reset
  resetState: () => set(initialState),

  // New actions for redesign
  toggleMapExpanded: () => set((state) => ({ mapExpanded: !state.mapExpanded })),
  setMapExpanded: (expanded) => set({ mapExpanded: expanded }),
  setSortMode: (mode) => set({ sortMode: mode }),
  setFilterTags: (tags) => set({ filterTags: tags }),
  toggleFilterTag: (tag) =>
    set((state) => ({
      filterTags: state.filterTags.includes(tag)
        ? state.filterTags.filter((t) => t !== tag)
        : [...state.filterTags, tag],
    })),
  setSelectedStory: (id) => set({ selectedStoryId: id }),
  fitAllStories: () =>
    set({
      mapZoom: 4,
      mapCenter: [78.9629, 20.5937] as [number, number],
      mapBounds: null,
    }),
}));

// Alias for backward compatibility
export const useAtlasStore = useStoriesStore;
export type AtlasState = StoriesState;
