import { http, HttpResponse } from 'msw';

// Spotify API mocks
const spotifyHandlers = [
  http.post('https://accounts.spotify.com/api/token', () => {
    return HttpResponse.json({
      access_token: 'mock-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
    });
  }),

  http.get('https://api.spotify.com/v1/me/player/currently-playing', () => {
    return HttpResponse.json({
      is_playing: true,
      item: {
        name: 'Test Song',
        artists: [{ name: 'Test Artist' }],
        album: {
          name: 'Test Album',
          images: [{ url: 'https://example.com/album.jpg' }],
        },
        external_urls: { spotify: 'https://spotify.com/track/123' },
      },
    });
  }),

  http.get('https://api.spotify.com/v1/me/top/tracks', () => {
    return HttpResponse.json({
      items: [
        {
          name: 'Track 1',
          artists: [{ name: 'Artist 1' }],
          album: { images: [{ url: 'https://example.com/1.jpg' }] },
          external_urls: { spotify: 'https://spotify.com/track/1' },
        },
        {
          name: 'Track 2',
          artists: [{ name: 'Artist 2' }],
          album: { images: [{ url: 'https://example.com/2.jpg' }] },
          external_urls: { spotify: 'https://spotify.com/track/2' },
        },
      ],
    });
  }),
];

// GitHub API mocks
const githubHandlers = [
  http.get('https://api.github.com/users/roeintheglasses', () => {
    return HttpResponse.json({
      followers: 100,
      public_repos: 25,
    });
  }),

  http.get('https://api.github.com/users/roeintheglasses/repos', () => {
    return HttpResponse.json([
      { fork: false, stargazers_count: 10 },
      { fork: false, stargazers_count: 20 },
      { fork: true, stargazers_count: 5 },
    ]);
  }),
];

// Valorant API mocks
const valorantHandlers = [
  http.get('https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/ap/*', () => {
    return HttpResponse.json({
      status: 200,
      data: {
        name: 'TestPlayer',
        tag: '1234',
        current_data: {
          currenttier: 21,
          currenttierpatched: 'Diamond 3',
          images: {
            small: 'https://example.com/rank-small.png',
            large: 'https://example.com/rank-large.png',
          },
        },
        highest_rank: {
          tier: 24,
          patched_tier: 'Immortal 3',
        },
        by_season: {
          e5a3: { wins: 50, number_of_games: 100 },
          e5a2: { wins: 30, number_of_games: 60 },
        },
      },
    });
  }),
];

// Internal API route mocks (for component testing)
const internalHandlers = [
  http.get('/api/now-playing', () => {
    return HttpResponse.json({
      isPlaying: true,
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      albumImageUrl: 'https://example.com/album.jpg',
      songUrl: 'https://spotify.com/track/123',
    });
  }),

  http.get('/api/top-tracks', () => {
    return HttpResponse.json({
      tracks: [
        {
          title: 'Track 1',
          artist: 'Artist 1',
          songUrl: 'https://spotify.com/track/1',
        },
        {
          title: 'Track 2',
          artist: 'Artist 2',
          songUrl: 'https://spotify.com/track/2',
        },
      ],
    });
  }),

  http.get('/api/guestbook', () => {
    return HttpResponse.json([
      {
        id: '1',
        body: 'Hello World!',
        created_by: 'Test User',
        updated_at: new Date().toISOString(),
      },
    ]);
  }),

  http.post('/api/guestbook', async ({ request }) => {
    const body = (await request.json()) as { body: string };
    return HttpResponse.json({
      id: '2',
      body: body.body,
      created_by: 'Test User',
      updated_at: new Date().toISOString(),
    });
  }),

  http.get('/api/github', () => {
    return HttpResponse.json({
      stars: 30,
      followers: 100,
    });
  }),

  http.get('/api/valorant', () => {
    return HttpResponse.json({
      name: 'TestPlayer',
      tag: '1234',
      currentRankImage: 'https://example.com/rank.png',
      highestRankImage: 'https://example.com/highest-rank.png',
      currentRank: 'Diamond 3',
      highestRank: 'Immortal 3',
      totalWins: 80,
      totalGames: 160,
    });
  }),
];

export const handlers = [
  ...spotifyHandlers,
  ...githubHandlers,
  ...valorantHandlers,
  ...internalHandlers,
];
