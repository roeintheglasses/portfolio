import type { GeoPoint, GeocodeResult, MapboxGeocodeResponse } from './types';
import { MAPBOX_CONFIG } from './mapbox';

const GEOCODING_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

/**
 * Search for locations using Mapbox Geocoding API
 * Should be called from API route to protect access token
 */
export async function searchLocations(query: string): Promise<GeocodeResult[]> {
  if (!query.trim() || query.length < 2) {
    return [];
  }

  if (!MAPBOX_CONFIG.accessToken) {
    throw new Error('Mapbox access token not configured');
  }

  const url = new URL(`${GEOCODING_BASE_URL}/${encodeURIComponent(query)}.json`);
  url.searchParams.set('access_token', MAPBOX_CONFIG.accessToken);
  url.searchParams.set('types', 'place,locality,neighborhood,address,poi');
  url.searchParams.set('limit', '5');
  url.searchParams.set('autocomplete', 'true');

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.status}`);
  }

  const data: MapboxGeocodeResponse = await response.json();

  return data.features.map((feature) => ({
    id: feature.id,
    name: feature.text,
    fullName: feature.place_name,
    coordinates: {
      lng: feature.center[0],
      lat: feature.center[1],
    },
    placeType: feature.place_type[0] || 'place',
  }));
}

/**
 * Reverse geocode coordinates to get location name
 * Should be called from API route to protect access token
 */
export async function reverseGeocode(coordinates: GeoPoint): Promise<string | null> {
  if (!MAPBOX_CONFIG.accessToken) {
    throw new Error('Mapbox access token not configured');
  }

  const url = new URL(`${GEOCODING_BASE_URL}/${coordinates.lng},${coordinates.lat}.json`);
  url.searchParams.set('access_token', MAPBOX_CONFIG.accessToken);
  url.searchParams.set('types', 'place,locality,neighborhood');
  url.searchParams.set('limit', '1');

  const response = await fetch(url.toString());

  if (!response.ok) {
    return null;
  }

  const data: MapboxGeocodeResponse = await response.json();
  return data.features[0]?.place_name || null;
}
