import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

// Define the image source type locally since the import path may vary
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

const builder = imageUrlBuilder(sanityClient);

/**
 * Generate optimized image URL from Sanity image reference
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get a responsive image URL with automatic format
 */
export function getImageUrl(source: SanityImageSource, width?: number, height?: number): string {
  let url = urlFor(source).auto('format');

  if (width) {
    url = url.width(width);
  }
  if (height) {
    url = url.height(height);
  }

  return url.url();
}

/**
 * Get image URLs for srcset
 */
export function getImageSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600]
): string {
  return widths.map((w) => `${urlFor(source).width(w).auto('format').url()} ${w}w`).join(', ');
}

/**
 * Get a blur placeholder URL (low quality)
 */
export function getBlurUrl(source: SanityImageSource): string {
  return urlFor(source).width(20).blur(10).auto('format').url();
}

/**
 * Image dimensions type
 */
export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * Get image dimensions from Sanity image metadata
 * Note: This requires the image to have been uploaded with metadata
 */
export function getImageDimensions(
  source: SanityImageSource & {
    asset?: { metadata?: { dimensions?: { width: number; height: number } } };
  }
): ImageDimensions | null {
  const dimensions = source?.asset?.metadata?.dimensions;
  if (!dimensions) return null;

  return {
    width: dimensions.width,
    height: dimensions.height,
    aspectRatio: dimensions.width / dimensions.height,
  };
}
