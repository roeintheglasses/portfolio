import type { GeoPoint, PhotoStoryPreview, GeoJSONFeatureCollection } from './types';

/**
 * Mapbox configuration
 */
export const MAPBOX_CONFIG = {
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
  styles: {
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11',
  },
  defaultStyle: 'mapbox://styles/mapbox/dark-v11',
  defaultCenter: [78.9629, 20.5937] as [number, number], // India
  defaultZoom: 4,
  minZoom: 2,
  maxZoom: 18,
  clusterRadius: 50,
  clusterMaxZoom: 14,
};

/**
 * Convert photo stories to GeoJSON FeatureCollection for the map
 */
export function storiesToGeoJSON(stories: PhotoStoryPreview[]): GeoJSONFeatureCollection {
  return {
    type: 'FeatureCollection',
    features: stories.map((story) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [story.location.coordinates.lng, story.location.coordinates.lat],
      },
      properties: {
        id: story._id,
        title: story.title,
        slug: story.slug,
        coverImageUrl: story.coverImageUrl,
        location: story.location.name,
        photoCount: story.photoCount,
      },
    })),
  };
}

// Alias for backward compatibility
export const walksToGeoJSON = storiesToGeoJSON;

/**
 * Convert a GeoPoint to Mapbox LngLat format
 */
export function geoPointToLngLat(point: GeoPoint): [number, number] {
  return [point.lng, point.lat];
}

/**
 * Convert Mapbox LngLat to GeoPoint
 */
export function lngLatToGeoPoint(lngLat: [number, number]): GeoPoint {
  return {
    lng: lngLat[0],
    lat: lngLat[1],
  };
}

/**
 * Calculate appropriate zoom level for given bounds
 */
export function getZoomForBounds(
  bounds: { sw: [number, number]; ne: [number, number] },
  mapWidth: number,
  mapHeight: number
): number {
  const WORLD_WIDTH = 256;
  const ZOOM_MAX = 18;

  const lngDiff = bounds.ne[0] - bounds.sw[0];
  const latDiff = bounds.ne[1] - bounds.sw[1];

  const maxDiff = Math.max(lngDiff, latDiff * (mapWidth / mapHeight));

  if (maxDiff < 0.0001) return ZOOM_MAX;

  const zoom = Math.log2(360 / maxDiff) + Math.log2(mapWidth / WORLD_WIDTH);

  return Math.min(Math.floor(zoom), ZOOM_MAX);
}

/**
 * Create a route GeoJSON for drawing on the map
 */
export function createRouteGeoJSON(coordinates: [number, number][]) {
  return {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates,
    },
  };
}

/**
 * Mapbox layer styles for the route
 */
export const routeLayerStyle = {
  id: 'route-line',
  type: 'line' as const,
  paint: {
    'line-color': '#ffffff',
    'line-width': 3,
    'line-opacity': 0.8,
  },
};

/**
 * Mapbox layer styles for route background (glow effect)
 */
export const routeBackgroundLayerStyle = {
  id: 'route-line-bg',
  type: 'line' as const,
  paint: {
    'line-color': '#ffffff',
    'line-width': 6,
    'line-opacity': 0.3,
    'line-blur': 3,
  },
};

/**
 * Get marker colors based on state
 */
export const markerColors = {
  default: '#ffffff',
  hover: '#3b82f6',
  active: '#8b5cf6',
  cluster: '#6366f1',
};

/**
 * Format coordinates for display
 */
export function formatCoordinates(point: GeoPoint): string {
  const latDir = point.lat >= 0 ? 'N' : 'S';
  const lngDir = point.lng >= 0 ? 'E' : 'W';

  return `${Math.abs(point.lat).toFixed(4)}°${latDir}, ${Math.abs(point.lng).toFixed(4)}°${lngDir}`;
}
