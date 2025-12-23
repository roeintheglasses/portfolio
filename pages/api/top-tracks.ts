import { getTopTracks } from 'lib/spotify';

export const config = {
  runtime: 'edge',
};

const TOP_TRACKS_LIMIT = 10;

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
  album?: { images?: { url: string }[] };
}

const emptyTracksResponse = () =>
  new Response(JSON.stringify({ tracks: [] }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });

export default async function handler() {
  try {
    const response = await getTopTracks();

    if (!response) {
      return emptyTracksResponse();
    }

    const data = await response.json();
    const items: SpotifyTrack[] = data?.items ?? [];

    const tracks = items.slice(0, TOP_TRACKS_LIMIT).map((track) => ({
      artist: track.artists.map((a) => a.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      albumImageUrl: track?.album?.images?.[0]?.url ?? '',
    }));

    return new Response(JSON.stringify({ tracks }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (err) {
    console.error('Failed to fetch top tracks:', err);
    return emptyTracksResponse();
  }
}
