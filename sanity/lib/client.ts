import { createClient, SanityClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

// Check if Sanity is configured
export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

// Create a mock client that returns empty results when Sanity is not configured
const createMockClient = (): SanityClient => {
  return {
    fetch: async () => [],
    config: () => ({}),
  } as unknown as SanityClient;
};

// Only create real clients if Sanity is configured
export const sanityClient: SanityClient = isSanityConfigured()
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : createMockClient();

// Preview client for draft content
export const previewClient: SanityClient = isSanityConfigured()
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : createMockClient();

// Get the appropriate client based on preview mode
export function getClient(preview = false): SanityClient {
  return preview ? previewClient : sanityClient;
}
