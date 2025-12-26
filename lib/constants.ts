/**
 * Shared constants used across the application
 */

/**
 * Blur placeholder for album/general images (JPEG format)
 * A small gray placeholder used for image loading states
 */
export const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCgwJDRMNDg0QCQwNEhAREhMTExMLDxQVFRQSFRMTEv/2wBDAQMEBAUEBQkFBQkSDAsMEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFBhEHEiExQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/ANf/Z';

/**
 * Blur placeholder for rank/icon images (PNG format)
 * A smaller transparent placeholder for icon loading states
 */
export const ICON_BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVQY02NgGCDAyMj4nxGK0QATAwMDA4M4IyMjA5gDEmBkYGBg+M/IyMgA5sA4YBoYGRj+g2lgZGRgYGAAABNxB0K6nBrVAAAAAElFTkSuQmCC';

/**
 * SWR configuration for metric/dashboard cards
 * Optimized to reduce unnecessary refetches
 */
export const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 2,
} as const;
