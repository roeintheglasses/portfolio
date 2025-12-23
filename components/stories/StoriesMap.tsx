'use client';

import { useCallback, useRef, useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useStoriesStore } from '@/store/storiesStore';
import { MAPBOX_CONFIG, storiesToGeoJSON } from '@/lib/mapbox';
import type { PhotoStoryPreview } from '@/lib/types';
import Supercluster from 'supercluster';

interface StoriesMapProps {
  stories: PhotoStoryPreview[];
}

export default function StoriesMap({ stories }: StoriesMapProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [MapComponents, setMapComponents] = useState<{
    Map: React.ComponentType<any>;
    Marker: React.ComponentType<any>;
  } | null>(null);
  const mapRef = useRef<any>(null);
  const {
    mapCenter,
    mapZoom,
    setMapBounds,
    setMapZoom,
    setMapCenter,
    hoveredStoryId,
    setHoveredStory,
    setSelectedStory,
  } = useStoriesStore();

  // Hydration fix for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load react-map-gl components dynamically
  useEffect(() => {
    import('react-map-gl/mapbox').then((mod) => {
      setMapComponents({
        Map: mod.Map,
        Marker: mod.Marker,
      });
    });
  }, []);

  // Get theme-aware map style
  const mapStyle = useMemo(() => {
    if (!mounted) return MAPBOX_CONFIG.defaultStyle;
    return resolvedTheme === 'dark' ? MAPBOX_CONFIG.styles.dark : MAPBOX_CONFIG.styles.light;
  }, [mounted, resolvedTheme]);

  // Create supercluster index
  const supercluster = useMemo(() => {
    const cluster = new Supercluster({
      radius: MAPBOX_CONFIG.clusterRadius,
      maxZoom: MAPBOX_CONFIG.clusterMaxZoom,
    });

    const geojson = storiesToGeoJSON(stories);
    cluster.load(geojson.features as any);

    return cluster;
  }, [stories]);

  // Get clusters for current viewport
  const clusters = useMemo(() => {
    if (!mapRef.current) return [];

    try {
      const map = mapRef.current.getMap();
      const bounds = map.getBounds();

      if (!bounds) return [];

      return supercluster.getClusters(
        [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
        Math.floor(mapZoom)
      );
    } catch {
      return [];
    }
  }, [supercluster, mapZoom]);

  // Update bounds when map moves
  const handleMoveEnd = useCallback(
    (e: any) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      const bounds = map.getBounds();
      if (bounds) {
        setMapBounds({
          sw: [bounds.getWest(), bounds.getSouth()],
          ne: [bounds.getEast(), bounds.getNorth()],
        });
      }

      setMapZoom(e.viewState.zoom);
      setMapCenter([e.viewState.longitude, e.viewState.latitude]);
    },
    [setMapBounds, setMapZoom, setMapCenter]
  );

  // Handle cluster click
  const handleClusterClick = useCallback(
    (clusterId: number, longitude: number, latitude: number) => {
      const expansionZoom = Math.min(
        supercluster.getClusterExpansionZoom(clusterId),
        MAPBOX_CONFIG.maxZoom
      );

      mapRef.current?.flyTo({
        center: [longitude, latitude],
        zoom: expansionZoom,
        duration: 500,
      });
    },
    [supercluster]
  );

  // Handle individual marker click - navigate to story
  const handleMarkerClick = useCallback(
    (slug: string, id: string) => {
      setSelectedStory(id);
      router.push(`/journal/${slug}`);
    },
    [router, setSelectedStory]
  );

  // Initialize bounds on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const map = mapRef.current?.getMap();
      if (map) {
        const bounds = map.getBounds();
        if (bounds) {
          setMapBounds({
            sw: [bounds.getWest(), bounds.getSouth()],
            ne: [bounds.getEast(), bounds.getNorth()],
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [setMapBounds, MapComponents]);

  if (!MAPBOX_CONFIG.accessToken) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">Mapbox token not configured</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local
          </p>
        </div>
      </div>
    );
  }

  if (!MapComponents) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-500 dark:border-gray-600 dark:border-t-indigo-400" />
      </div>
    );
  }

  const { Map, Marker } = MapComponents;

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_CONFIG.accessToken}
      initialViewState={{
        longitude: mapCenter[0],
        latitude: mapCenter[1],
        zoom: mapZoom,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={mapStyle}
      onMoveEnd={handleMoveEnd}
      minZoom={MAPBOX_CONFIG.minZoom}
      maxZoom={MAPBOX_CONFIG.maxZoom}
    >
      {clusters.map((cluster: any) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          // Render cluster marker
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
              anchor="center"
            >
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white shadow-lg transition-transform hover:scale-110 dark:bg-indigo-600"
                onClick={() => handleClusterClick(cluster.id as number, longitude, latitude)}
              >
                {pointCount}
              </button>
            </Marker>
          );
        }

        // Render individual story marker
        const { id, title, slug, coverImageUrl } = cluster.properties;
        const isHovered = hoveredStoryId === id;

        return (
          <Marker key={`story-${id}`} longitude={longitude} latitude={latitude} anchor="bottom">
            <button
              className={`group relative transition-transform ${isHovered ? 'scale-125' : 'hover:scale-110'}`}
              onClick={() => handleMarkerClick(slug, id)}
              onMouseEnter={() => setHoveredStory(id)}
              onMouseLeave={() => setHoveredStory(null)}
            >
              {/* Marker pin */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg transition-colors ${
                  isHovered
                    ? 'border-indigo-400 bg-indigo-500'
                    : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800'
                }`}
              >
                {coverImageUrl ? (
                  <img
                    src={coverImageUrl + '?w=64&h=64&fit=crop'}
                    alt=""
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-500" />
                )}
              </div>

              {/* Tooltip */}
              <div
                className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-xl transition-opacity dark:border-gray-700 dark:bg-gray-900 dark:text-white ${
                  isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {title}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-gray-900" />
              </div>
            </button>
          </Marker>
        );
      })}
    </Map>
  );
}
