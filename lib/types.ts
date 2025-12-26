export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
  albumImageUrl: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export type GitHub = {
  stars: number;
};

export type Valorant = {
  name: string;
  tag: string;
  currentRankImage: string;
  highestRankImage: string;
  currentRank: string;
  highestRank: string;
  totalWins: number;
  totalGames: number;
};

export type CurrentRank = {
  currenttier: number;
  currenttierpatched: string;
  images: ValImages;
  ranking_in_tier: number;
  mmr_change_to_last_game: number;
  elo: number;
  games_needed_for_rating: number;
  old: boolean;
};

export type ValImages = {
  small: string;
  large: string;
  triangle_down: string;
  triangle_up: string;
};

export type HighestRank = {
  old: boolean;
  tier: number;
  patched_tier: string;
  season: string;
  converted: number;
};

export type Unsplash = {
  downloads: number;
  views: number;
};

export type Gradient = {
  gradient: string;
};

// Icon type from @tabler/icons-react
// Using ComponentType to properly type icon components that accept className prop
export type TablerIconComponent = React.ComponentType<{ className?: string }>;

export type ChipData = {
  gradient: string;
  chipName: string;
  icon: TablerIconComponent;
};

// Stories & Journal Types

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface RoutePoint extends GeoPoint {
  elevation?: number;
}

export interface ExifData {
  camera?: string;
  lens?: string;
  aperture?: string;
  shutter?: string;
  iso?: number;
  focalLength?: string;
  takenAt?: string;
}

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImageAssetExpanded {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string;
  };
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset | SanityImageAssetExpanded;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface StoryPhoto {
  _key: string;
  _type: 'storyPhoto';
  image: SanityImage;
  caption?: string;
  locationName?: string;
  coordinates?: GeoPoint;
  exif?: ExifData;
  isFullBleed?: boolean;
}

// Alias for backward compatibility
export type WalkPhoto = StoryPhoto;

export interface TextBlock {
  _key: string;
  _type: 'block';
  children: Array<{
    _key: string;
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
}

export interface PhotoStory {
  _id: string;
  _type: 'photoStory';
  title: string;
  slug:
    | {
        _type: 'slug';
        current: string;
      }
    | string;
  coverImage: SanityImage;
  date?: string;
  location: {
    name: string;
    coordinates: GeoPoint;
  };
  summary?: string;
  route: RoutePoint[];
  photos: StoryPhoto[];
  tags?: string[];
  published: boolean;
  featured?: boolean;
}

export interface PhotoStoryPreview {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  coverImageLqip?: string;
  date?: string;
  location: {
    name: string;
    coordinates: GeoPoint;
  };
  summary?: string;
  photoCount: number;
  tags?: string[];
  featured?: boolean;
}

// Aliases for backward compatibility
export type PhotoWalk = PhotoStory;
export type PhotoWalkPreview = PhotoStoryPreview;

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    id: string;
    title: string;
    slug: string;
    coverImageUrl: string;
    location: string;
    photoCount: number;
  };
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface ClusterProperties {
  cluster: boolean;
  cluster_id?: number;
  point_count?: number;
  point_count_abbreviated?: string;
}

export type ClusterFeature = GeoJSONFeature & {
  properties: GeoJSONFeature['properties'] & ClusterProperties;
};

// Geocoding Types

export interface GeocodeResult {
  id: string;
  name: string;
  fullName: string;
  coordinates: GeoPoint;
  placeType: string;
}

export type CoordinateSource = 'exif' | 'geocoded' | 'manual';

export interface MapboxGeocodeFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
  place_type: string[];
  text: string;
  context?: Array<{
    id: string;
    text: string;
  }>;
}

export interface MapboxGeocodeResponse {
  features: MapboxGeocodeFeature[];
  query: string[];
}
