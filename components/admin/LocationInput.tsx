'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { IconMapPin, IconLoader2, IconCheck, IconPhoto, IconWorld } from '@tabler/icons-react';
import { useCreateStoryStore } from '@/store/createStoryStore';
import type { GeoPoint, GeocodeResult } from '@/lib/types';

// Dynamically import the map to avoid SSR issues
const LocationPreviewMap = dynamic(() => import('./LocationPreviewMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-900">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-indigo-500" />
    </div>
  ),
});

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function LocationInput() {
  const { photos, metadata, setMetadata } = useCreateStoryStore();

  // Local state for autocomplete
  const [inputValue, setInputValue] = useState(metadata.locationName);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Get EXIF coordinates from photos
  const exifCoordinates = useMemo(() => {
    const photoWithGps = photos.find((p) => p.coordinates);
    return photoWithGps?.coordinates || null;
  }, [photos]);

  // Debounce search input
  const debouncedQuery = useDebounce(inputValue, 300);

  // Fetch geocoding results
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      // Skip search if the input matches the currently selected location
      if (debouncedQuery === metadata.locationName && metadata.coordinates) {
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/geocode?query=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
        setActiveIndex(-1);
      } catch (error) {
        console.error('Geocoding error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, metadata.locationName, metadata.coordinates]);

  // Handle selection from dropdown
  const handleSelect = useCallback(
    (result: GeocodeResult) => {
      setInputValue(result.fullName);
      setMetadata({
        locationName: result.fullName,
        coordinates: result.coordinates,
        coordinateSource: 'geocoded',
      });
      setIsOpen(false);
      setResults([]);
    },
    [setMetadata]
  );

  // Handle using EXIF coordinates
  const handleUseExifCoordinates = useCallback(() => {
    if (exifCoordinates) {
      setMetadata({
        coordinates: exifCoordinates,
        coordinateSource: 'exif',
      });
    }
  }, [exifCoordinates, setMetadata]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && results[activeIndex]) {
            handleSelect(results[activeIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    },
    [isOpen, results, activeIndex, handleSelect]
  );

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync input with store when metadata changes externally
  useEffect(() => {
    setInputValue(metadata.locationName);
  }, [metadata.locationName]);

  const showExifOption = exifCoordinates && metadata.coordinateSource !== 'exif';
  const hasSelectedLocation = metadata.coordinates && metadata.locationName;

  return (
    <div className="space-y-3">
      {/* Location input with autocomplete */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Location <span className="text-red-400">*</span>
        </label>
        <div className="relative mt-1">
          <IconMapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // Clear coordinates if user is typing a new location
              if (e.target.value !== metadata.locationName) {
                setMetadata({ coordinates: undefined, coordinateSource: undefined });
              }
            }}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a location..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-10 pr-10 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
            autoComplete="off"
          />
          {isLoading && (
            <IconLoader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-500" />
          )}
          {hasSelectedLocation && !isLoading && (
            <IconCheck className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-400" />
          )}

          {/* Dropdown results */}
          {isOpen && results.length > 0 && (
            <ul
              ref={listRef}
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-700 bg-gray-900 shadow-xl"
            >
              {results.map((result, index) => (
                <li key={result.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                      index === activeIndex
                        ? 'bg-indigo-500/20 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <IconMapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <p className="font-medium">{result.name}</p>
                      <p className="text-sm text-gray-500">{result.fullName}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Coordinate display and source toggle */}
      {metadata.coordinates && (
        <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {metadata.coordinateSource === 'exif' ? (
                <IconPhoto className="h-3.5 w-3.5" />
              ) : (
                <IconWorld className="h-3.5 w-3.5" />
              )}
              <span>
                {metadata.coordinateSource === 'exif' ? 'From photo EXIF' : 'From geocoding'}
              </span>
            </div>
            <p className="text-xs text-green-400">
              {metadata.coordinates.lat.toFixed(5)}, {metadata.coordinates.lng.toFixed(5)}
            </p>
          </div>

          {/* Map preview */}
          <div className="mt-3">
            <LocationPreviewMap coordinates={metadata.coordinates} className="h-32 w-full" />
          </div>

          {/* Option to use EXIF coordinates */}
          {showExifOption && (
            <button
              type="button"
              onClick={handleUseExifCoordinates}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700"
            >
              <IconPhoto className="h-4 w-4" />
              Use photo GPS coordinates instead
              <span className="text-xs text-gray-500">
                ({exifCoordinates.lat.toFixed(3)}, {exifCoordinates.lng.toFixed(3)})
              </span>
            </button>
          )}
        </div>
      )}

      {/* Show EXIF option when no location selected but EXIF available */}
      {!metadata.coordinates && exifCoordinates && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
          <p className="text-sm text-amber-400">GPS coordinates found in photo EXIF data</p>
          <button
            type="button"
            onClick={handleUseExifCoordinates}
            className="mt-2 flex items-center gap-2 text-sm text-amber-300 underline hover:no-underline"
          >
            <IconPhoto className="h-4 w-4" />
            Use these coordinates ({exifCoordinates.lat.toFixed(4)},{' '}
            {exifCoordinates.lng.toFixed(4)})
          </button>
        </div>
      )}
    </div>
  );
}
