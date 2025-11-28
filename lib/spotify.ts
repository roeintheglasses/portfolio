const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

interface AccessTokenResponse {
  access_token: string;
}

const getAccessToken = async (): Promise<AccessTokenResponse | null> => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token ?? '',
      }),
    });

    return response.json() as Promise<AccessTokenResponse>;
  } catch (err) {
    console.error('Failed to get Spotify access token:', err);
    return null;
  }
};

export const getNowPlaying = async (): Promise<Response | null> => {
  try {
    const tokenData = await getAccessToken();
    if (!tokenData) return null;

    return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
  } catch (err) {
    console.error('Failed to get now playing:', err);
    return null;
  }
};

export const getTopTracks = async (): Promise<Response | null> => {
  try {
    const tokenData = await getAccessToken();
    if (!tokenData) return null;

    return fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
  } catch (err) {
    console.error('Failed to get top tracks:', err);
    return null;
  }
};
