import type { ExifData, GeoPoint } from './types';

/**
 * Extract EXIF data from an image file
 * Uses the exifr library for parsing
 */
export async function extractExif(file: File): Promise<ExifData | null> {
  try {
    // Dynamic import to avoid SSR issues
    const exifr = await import('exifr');

    const data = await exifr.parse(file, {
      pick: [
        'Make',
        'Model',
        'LensModel',
        'FNumber',
        'ExposureTime',
        'ISO',
        'FocalLength',
        'DateTimeOriginal',
      ],
    });

    if (!data) return null;

    const exifData: ExifData = {};

    // Camera make and model
    if (data.Make || data.Model) {
      exifData.camera = [data.Make, data.Model].filter(Boolean).join(' ').trim();
    }

    // Lens
    if (data.LensModel) {
      exifData.lens = data.LensModel;
    }

    // Aperture (f-number)
    if (data.FNumber) {
      exifData.aperture = `f/${data.FNumber}`;
    }

    // Shutter speed
    if (data.ExposureTime) {
      if (data.ExposureTime < 1) {
        exifData.shutter = `1/${Math.round(1 / data.ExposureTime)}s`;
      } else {
        exifData.shutter = `${data.ExposureTime}s`;
      }
    }

    // ISO
    if (data.ISO) {
      exifData.iso = data.ISO;
    }

    // Focal length
    if (data.FocalLength) {
      exifData.focalLength = `${Math.round(data.FocalLength)}mm`;
    }

    // Date taken
    if (data.DateTimeOriginal) {
      exifData.takenAt =
        data.DateTimeOriginal instanceof Date
          ? data.DateTimeOriginal.toISOString()
          : data.DateTimeOriginal;
    }

    return exifData;
  } catch (error) {
    console.error('Error extracting EXIF data:', error);
    return null;
  }
}

/**
 * Extract GPS coordinates from an image file
 */
export async function extractGpsFromExif(file: File): Promise<GeoPoint | null> {
  try {
    // Dynamic import to avoid SSR issues
    const exifr = await import('exifr');

    const gps = await exifr.gps(file);

    if (gps && typeof gps.latitude === 'number' && typeof gps.longitude === 'number') {
      return {
        lat: gps.latitude,
        lng: gps.longitude,
      };
    }

    return null;
  } catch (error) {
    console.error('Error extracting GPS from EXIF:', error);
    return null;
  }
}

/**
 * Extract both EXIF and GPS data from an image file
 */
export async function extractAllImageMetadata(file: File): Promise<{
  exif: ExifData | null;
  gps: GeoPoint | null;
}> {
  const [exif, gps] = await Promise.all([extractExif(file), extractGpsFromExif(file)]);

  return { exif, gps };
}

/**
 * Format EXIF data for display
 */
export function formatExifForDisplay(exif: ExifData): string[] {
  const parts: string[] = [];

  if (exif.camera) parts.push(exif.camera);
  if (exif.lens) parts.push(exif.lens);
  if (exif.focalLength) parts.push(exif.focalLength);
  if (exif.aperture) parts.push(exif.aperture);
  if (exif.shutter) parts.push(exif.shutter);
  if (exif.iso) parts.push(`ISO ${exif.iso}`);

  return parts;
}
