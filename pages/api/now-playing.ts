import { z } from 'zod';
import { getNowPlaying } from 'lib/spotify';

export const config = {
  runtime: 'edge',
};

// Schema for validating Spotify now playing response
const SpotifyArtistSchema = z.object({
  name: z.string(),
});

const SpotifyAlbumSchema = z.object({
  name: z.string(),
  images: z.array(z.object({ url: z.string() })).optional(),
});

const SpotifyTrackSchema = z.object({
  name: z.string(),
  artists: z.array(SpotifyArtistSchema),
  album: SpotifyAlbumSchema,
  external_urls: z.object({
    spotify: z.string(),
  }),
});

const NowPlayingResponseSchema = z.object({
  is_playing: z.boolean(),
  item: SpotifyTrackSchema.nullable(),
});

const notPlayingResponse = () =>
  new Response(JSON.stringify({ isPlaying: false }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });

export default async function handler() {
  try {
    const response = await getNowPlaying();

    if (!response || response.status === 204 || response.status > 400) {
      return notPlayingResponse();
    }

    // Check response.ok before parsing JSON
    if (!response.ok) {
      console.error(`Spotify API returned status: ${response.status}`);
      return notPlayingResponse();
    }

    let rawData: unknown;
    try {
      rawData = await response.json();
    } catch (parseError) {
      console.error('Failed to parse Spotify response JSON:', parseError);
      return notPlayingResponse();
    }

    // Validate response structure
    const parsed = NowPlayingResponseSchema.safeParse(rawData);

    if (!parsed.success) {
      console.error('Invalid Spotify response structure:', parsed.error.message);
      return notPlayingResponse();
    }

    const song = parsed.data;

    if (!song.item) {
      return notPlayingResponse();
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((a) => a.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images?.[0]?.url ?? '';
    const songUrl = song.item.external_urls.spotify;

    return new Response(
      JSON.stringify({
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      }
    );
  } catch (err) {
    console.error('Now playing handler error:', err);
    return notPlayingResponse();
  }
}
