'use client';

import { useMemo, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { IconRoute, IconPhoto, IconCalendar, IconMapPin } from '@tabler/icons-react';
import {
  MAPBOX_CONFIG,
  createRouteGeoJSON,
  routeLayerStyle,
  routeBackgroundLayerStyle,
} from '@/lib/mapbox';
import { getRouteLength, formatDistance, getBoundsFromPoints, routeToGeoJSON } from '@/lib/geo';
import type { PhotoStory, GeoPoint, RoutePoint } from '@/lib/types';

interface JourneySummaryProps {
  story: PhotoStory;
  photoLocations: Array<{ coordinates: GeoPoint; index: number }>;
}

export default function JourneySummary({ story, photoLocations }: JourneySummaryProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [MapComponents, setMapComponents] = useState<{
    Map: React.ComponentType<any>;
    Source: React.ComponentType<any>;
    Layer: React.ComponentType<any>;
    Marker: React.ComponentType<any>;
  } | null>(null);

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

  const route = story.route || [];
  const photos = story.photos || [];

  // Calculate stats
  const stats = useMemo(() => {
    const distance = getRouteLength(route);
    const photoCount = photos.length;
    const formattedDate = story.date
      ? new Date(story.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        })
      : null;

    return {
      distance: formatDistance(distance),
      photoCount,
      date: formattedDate,
      location: story.location?.name,
    };
  }, [route, photos, story.date, story.location]);

  // Route coordinates for map
  const routeCoordinates = useMemo(() => routeToGeoJSON(route), [route]);
  const routeGeoJSON = useMemo(() => createRouteGeoJSON(routeCoordinates), [routeCoordinates]);

  // Calculate initial viewport
  const initialViewport = useMemo(() => {
    const bounds = getBoundsFromPoints(route);
    if (!bounds) {
      return {
        longitude: route[0]?.lng || 0,
        latitude: route[0]?.lat || 0,
        zoom: 12,
      };
    }

    const centerLng = (bounds.sw[0] + bounds.ne[0]) / 2;
    const centerLat = (bounds.sw[1] + bounds.ne[1]) / 2;

    return {
      longitude: centerLng,
      latitude: centerLat,
      zoom: 12,
    };
  }, [route]);

  // Get map style based on theme
  const mapStyle = mounted
    ? resolvedTheme === 'dark'
      ? MAPBOX_CONFIG.styles?.dark || MAPBOX_CONFIG.defaultStyle
      : MAPBOX_CONFIG.styles?.light || MAPBOX_CONFIG.defaultStyle
    : MAPBOX_CONFIG.defaultStyle;

  if (route.length === 0) return null;

  return (
    <section className="border-t border-gray-200 bg-gray-100/50 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Journey</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            A visual summary of this photo story
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-6 md:gap-12"
        >
          {stats.distance && stats.distance !== '0m' && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <IconRoute className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stats.distance}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <IconPhoto className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.photoCount}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Photos</p>
            </div>
          </div>

          {stats.date && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <IconCalendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.date}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
              </div>
            </div>
          )}

          {stats.location && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <IconMapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stats.location}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700"
        >
          {!MAPBOX_CONFIG.accessToken || !MapComponents ? (
            <div className="flex h-96 items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-500 dark:border-gray-600" />
            </div>
          ) : (
            <div className="h-96 md:h-[500px]">
              <MapComponents.Map
                mapboxAccessToken={MAPBOX_CONFIG.accessToken}
                initialViewState={initialViewport}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapStyle}
                interactive={true}
                attributionControl={false}
              >
                {/* Route line background (glow) */}
                <MapComponents.Source id="route-bg-summary" type="geojson" data={routeGeoJSON}>
                  <MapComponents.Layer {...routeBackgroundLayerStyle} id="route-bg-layer-summary" />
                </MapComponents.Source>

                {/* Route line */}
                <MapComponents.Source id="route-summary" type="geojson" data={routeGeoJSON}>
                  <MapComponents.Layer {...routeLayerStyle} id="route-layer-summary" />
                </MapComponents.Source>

                {/* Photo location markers */}
                {photoLocations.map(({ coordinates, index }) => (
                  <MapComponents.Marker
                    key={index}
                    longitude={coordinates.lng}
                    latitude={coordinates.lat}
                    anchor="center"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-xs font-medium text-white shadow-lg">
                      {index + 1}
                    </div>
                  </MapComponents.Marker>
                ))}

                {/* Start marker */}
                {route[0] && (
                  <MapComponents.Marker
                    longitude={route[0].lng}
                    latitude={route[0].lat}
                    anchor="center"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-white shadow-lg">
                      S
                    </div>
                  </MapComponents.Marker>
                )}

                {/* End marker */}
                {route.length > 1 &&
                  (() => {
                    const endPoint = route[route.length - 1];
                    return endPoint ? (
                      <MapComponents.Marker
                        longitude={endPoint.lng}
                        latitude={endPoint.lat}
                        anchor="center"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white shadow-lg">
                          E
                        </div>
                      </MapComponents.Marker>
                    ) : null;
                  })()}
              </MapComponents.Map>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
