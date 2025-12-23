'use client';

import { useEffect, useState } from 'react';
import { MAPBOX_CONFIG } from '@/lib/mapbox';
import type { GeoPoint } from '@/lib/types';

interface LocationPreviewMapProps {
  coordinates: GeoPoint;
  className?: string;
}

export default function LocationPreviewMap({
  coordinates,
  className = '',
}: LocationPreviewMapProps) {
  const [MapComponents, setMapComponents] = useState<{
    Map: React.ComponentType<any>;
    Marker: React.ComponentType<any>;
  } | null>(null);

  useEffect(() => {
    import('react-map-gl/mapbox').then((mod) => {
      setMapComponents({
        Map: mod.Map,
        Marker: mod.Marker,
      });
    });
  }, []);

  if (!MAPBOX_CONFIG.accessToken) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 text-gray-500 ${className}`}>
        <span className="text-xs">Map unavailable</span>
      </div>
    );
  }

  if (!MapComponents) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-indigo-500" />
      </div>
    );
  }

  const { Map, Marker } = MapComponents;

  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      <Map
        mapboxAccessToken={MAPBOX_CONFIG.accessToken}
        initialViewState={{
          longitude: coordinates.lng,
          latitude: coordinates.lat,
          zoom: 12,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAPBOX_CONFIG.defaultStyle}
        interactive={false}
        attributionControl={false}
      >
        <Marker longitude={coordinates.lng} latitude={coordinates.lat} anchor="center">
          <div className="h-4 w-4 rounded-full border-2 border-white bg-indigo-500 shadow-lg" />
        </Marker>
      </Map>
    </div>
  );
}
