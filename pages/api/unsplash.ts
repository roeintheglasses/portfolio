import { z } from 'zod';

export const config = {
  runtime: 'edge',
};

// Schema for validating Unsplash statistics response
const UnsplashStatsSchema = z.object({
  downloads: z
    .object({
      total: z.number(),
    })
    .optional(),
  views: z
    .object({
      total: z.number(),
    })
    .optional(),
});

const emptyResponse = () =>
  new Response(JSON.stringify({ downloads: 0, views: 0 }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });

export default async function handler() {
  try {
    const accessToken = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessToken) {
      console.error('UNSPLASH_ACCESS_KEY is not configured');
      return emptyResponse();
    }

    const response = await fetch(
      `https://api.unsplash.com/users/roeintheglasses/statistics?client_id=${accessToken}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      console.error(`Unsplash API returned status: ${response.status}`);
      return emptyResponse();
    }

    let rawData: unknown;
    try {
      rawData = await response.json();
    } catch (parseError) {
      console.error('Failed to parse Unsplash response JSON:', parseError);
      return emptyResponse();
    }

    // Validate response structure
    const parsed = UnsplashStatsSchema.safeParse(rawData);

    if (!parsed.success) {
      console.error('Invalid Unsplash response structure:', parsed.error.message);
      return emptyResponse();
    }

    return new Response(
      JSON.stringify({
        downloads: parsed.data.downloads?.total ?? 0,
        views: parsed.data.views?.total ?? 0,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
        },
      }
    );
  } catch (err) {
    console.error('Failed to fetch Unsplash data:', err);
    return emptyResponse();
  }
}
