import type { GeoPoint, RoutePoint } from './types';

/**
 * Calculate the Haversine distance between two geographic points
 * @returns Distance in kilometers
 */
export function haversineDistance(p1: GeoPoint, p2: GeoPoint): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(p2.lat - p1.lat);
  const dLng = toRadians(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(p1.lat)) *
      Math.cos(toRadians(p2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Check if a point is within given bounds
 */
export function isPointInBounds(
  point: GeoPoint,
  bounds: { sw: [number, number]; ne: [number, number] }
): boolean {
  const [swLng, swLat] = bounds.sw;
  const [neLng, neLat] = bounds.ne;

  return point.lng >= swLng && point.lng <= neLng && point.lat >= swLat && point.lat <= neLat;
}

/**
 * Calculate the total length of a route
 * @returns Total distance in kilometers
 */
export function getRouteLength(route: RoutePoint[]): number {
  if (route.length < 2) return 0;
  let totalDistance = 0;
  for (let i = 1; i < route.length; i++) {
    const prev = route[i - 1];
    const curr = route[i];
    if (prev && curr) {
      totalDistance += haversineDistance(prev, curr);
    }
  }
  return totalDistance;
}

/**
 * Get the center point of a set of coordinates
 */
export function getCenterPoint(points: GeoPoint[]): GeoPoint {
  if (points.length === 0) {
    return { lat: 0, lng: 0 };
  }

  const sum = points.reduce(
    (acc, point) => ({
      lat: acc.lat + point.lat,
      lng: acc.lng + point.lng,
    }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: sum.lat / points.length,
    lng: sum.lng / points.length,
  };
}

/**
 * Get bounds that encompass all given points
 */
export function getBoundsFromPoints(
  points: GeoPoint[]
): { sw: [number, number]; ne: [number, number] } | null {
  if (points.length === 0) return null;

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  points.forEach((point) => {
    minLat = Math.min(minLat, point.lat);
    maxLat = Math.max(maxLat, point.lat);
    minLng = Math.min(minLng, point.lng);
    maxLng = Math.max(maxLng, point.lng);
  });

  // Add some padding
  const latPadding = (maxLat - minLat) * 0.1 || 0.01;
  const lngPadding = (maxLng - minLng) * 0.1 || 0.01;

  return {
    sw: [minLng - lngPadding, minLat - latPadding],
    ne: [maxLng + lngPadding, maxLat + latPadding],
  };
}

/**
 * Interpolate a position along a route based on progress (0-1)
 */
export function interpolateRoutePosition(route: RoutePoint[], progress: number): GeoPoint {
  if (route.length === 0) {
    return { lat: 0, lng: 0 };
  }

  const firstPoint = route[0];
  if (!firstPoint || route.length === 1 || progress <= 0) {
    return { lat: firstPoint?.lat ?? 0, lng: firstPoint?.lng ?? 0 };
  }

  if (progress >= 1) {
    const last = route[route.length - 1];
    return { lat: last?.lat ?? 0, lng: last?.lng ?? 0 };
  }

  // Calculate total route length and find the position
  const totalLength = getRouteLength(route);
  if (totalLength === 0) {
    return { lat: firstPoint.lat, lng: firstPoint.lng };
  }

  const targetDistance = totalLength * progress;

  let accumulatedDistance = 0;
  for (let i = 1; i < route.length; i++) {
    const prev = route[i - 1];
    const curr = route[i];
    if (!prev || !curr) continue;

    const segmentLength = haversineDistance(prev, curr);

    if (accumulatedDistance + segmentLength >= targetDistance) {
      // Interpolate within this segment
      const segmentProgress =
        segmentLength > 0 ? (targetDistance - accumulatedDistance) / segmentLength : 0;
      return {
        lat: prev.lat + (curr.lat - prev.lat) * segmentProgress,
        lng: prev.lng + (curr.lng - prev.lng) * segmentProgress,
      };
    }

    accumulatedDistance += segmentLength;
  }

  // Fallback to last point
  const last = route[route.length - 1];
  return { lat: last?.lat ?? 0, lng: last?.lng ?? 0 };
}

/**
 * Convert route points to GeoJSON LineString coordinates
 */
export function routeToGeoJSON(route: RoutePoint[]): [number, number][] {
  return route.map((point) => [point.lng, point.lat]);
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
}
