'use client';

import { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useStoriesStore } from '@/store/storiesStore';
import {
  MAPBOX_CONFIG,
  createRouteGeoJSON,
  routeLayerStyle,
  routeBackgroundLayerStyle,
} from '@/lib/mapbox';
import { interpolateRoutePosition, getBoundsFromPoints, routeToGeoJSON } from '@/lib/geo';
import type { RoutePoint, GeoPoint } from '@/lib/types';

interface JournalRouteMapProps {
  route: RoutePoint[];
  photoLocations: Array<{ coordinates: GeoPoint; index: number }>;
}

export default function JournalRouteMap({ route, photoLocations }: JournalRouteMapProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [MapComponents, setMapComponents] = useState<{
    Map: React.ComponentType<any>;
    Source: React.ComponentType<any>;
    Layer: React.ComponentType<any>;
    Marker: React.ComponentType<any>;
  } | null>(null);
  const { scrollProgress, activePhotoIndex } = useStoriesStore();

  // Load react-map-gl components dynamically
  useEffect(() => {
    setMounted(true);
    import('react-map-gl/mapbox').then((mod) => {
      setMapComponents({
        Map: mod.Map,
        Source: mod.Source,
        Layer: mod.Layer,
        Marker: mod.Marker,
      });
    });
  }, []);

  // Get map style based on theme
  const mapStyle = mounted
    ? resolvedTheme === 'dark'
      ? MAPBOX_CONFIG.styles?.dark || MAPBOX_CONFIG.defaultStyle
      : MAPBOX_CONFIG.styles?.light || MAPBOX_CONFIG.defaultStyle
    : MAPBOX_CONFIG.defaultStyle;

  // Calculate current position on route based on scroll progress
  const currentPosition = useMemo(() => {
    return interpolateRoutePosition(route, scrollProgress);
  }, [route, scrollProgress]);

  // Convert route to GeoJSON coordinates
  const routeCoordinates = useMemo(() => routeToGeoJSON(route), [route]);

  // Create GeoJSON for the route line
  const routeGeoJSON = useMemo(() => createRouteGeoJSON(routeCoordinates), [routeCoordinates]);

  // Calculate initial viewport to fit the route
  const initialViewport = useMemo(() => {
    const bounds = getBoundsFromPoints(route);
    if (!bounds) {
      return {
        longitude: route[0]?.lng || 0,
        latitude: route[0]?.lat || 0,
        zoom: 14,
      };
    }

    const centerLng = (bounds.sw[0] + bounds.ne[0]) / 2;
    const centerLat = (bounds.sw[1] + bounds.ne[1]) / 2;

    return {
      longitude: centerLng,
      latitude: centerLat,
      zoom: 13,
    };
  }, [route]);

  if (!MAPBOX_CONFIG.accessToken || route.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
        <p className="text-sm">No route data available</p>
      </div>
    );
  }

  if (!MapComponents) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-500 dark:border-gray-600" />
      </div>
    );
  }

  const { Map, Source, Layer, Marker } = MapComponents;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <Map
        mapboxAccessToken={MAPBOX_CONFIG.accessToken}
        initialViewState={initialViewport}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        interactive={false}
        attributionControl={false}
      >
        {/* Route line background (glow) */}
        <Source id="route-bg" type="geojson" data={routeGeoJSON}>
          <Layer {...routeBackgroundLayerStyle} />
        </Source>

        {/* Route line */}
        <Source id="route" type="geojson" data={routeGeoJSON}>
          <Layer {...routeLayerStyle} />
        </Source>

        {/* Photo location markers */}
        {photoLocations.map(({ coordinates, index }) => (
          <Marker
            key={index}
            longitude={coordinates.lng}
            latitude={coordinates.lat}
            anchor="center"
          >
            <div
              className={`h-3 w-3 rounded-full border-2 transition-all ${
                index === activePhotoIndex
                  ? 'scale-150 border-indigo-400 bg-indigo-500'
                  : 'border-white/50 bg-white/30'
              }`}
            />
          </Marker>
        ))}

        {/* Current position marker */}
        <Marker longitude={currentPosition.lng} latitude={currentPosition.lat} anchor="center">
          <div className="relative">
            {/* Pulse animation */}
            <div className="absolute inset-0 h-5 w-5 animate-ping rounded-full bg-white/30" />
            {/* Main dot */}
            <div className="relative h-5 w-5 rounded-full border-2 border-white bg-indigo-500 shadow-lg" />
          </div>
        </Marker>
      </Map>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="h-1 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="mt-2 text-center text-xs text-gray-600 dark:text-gray-500">
          {Math.round(scrollProgress * 100)}% complete
        </div>
      </div>
    </div>
  );
}
