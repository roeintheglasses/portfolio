import { useEffect } from 'react';

const VISITOR_ID_KEY = 'visitor_id';

/**
 * Generate a UUID v4
 */
function generateVisitorId(): string {
  // Use crypto.randomUUID if available, otherwise fallback
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get or create a persistent visitor ID
 */
function getVisitorId(): string {
  if (typeof window === 'undefined') return '';

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

/**
 * Hook to track page views and unique visitors
 * - Tracks page views (incremented per page per session)
 * - Tracks unique visitors (persistent ID in localStorage)
 * - Skips tracking in development by default
 */
export function useViewTracker(slug: string, trackInDev = false) {
  useEffect(() => {
    // Skip if no slug
    if (!slug) return;

    // Skip in development unless explicitly enabled
    if (process.env.NODE_ENV === 'development' && !trackInDev) return;

    // Normalize slug (remove leading slash, use 'home' for root)
    const normalizedSlug = slug === '/' ? 'home' : slug.replace(/^\//, '').replace(/\/$/, '');

    // Skip if already tracked this session
    const sessionKey = `viewed:${normalizedSlug}`;
    if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) {
      return;
    }

    // Track the view
    const trackView = async () => {
      try {
        const visitorId = getVisitorId();

        await fetch(`/api/views/${encodeURIComponent(normalizedSlug)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ visitorId }),
        });

        // Mark as tracked for this session
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(sessionKey, '1');
        }
      } catch (error) {
        // Silently fail - view tracking shouldn't break the page
        console.error('Failed to track view:', error);
      }
    };

    trackView();
  }, [slug, trackInDev]);
}
