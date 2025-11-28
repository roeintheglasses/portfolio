export const config = {
  runtime: 'edge',
};

export default async function handler() {
  try {
    const accessToken = process.env.UNSPLASH_ACCESS_KEY;
    const response = await fetch(
      `https://api.unsplash.com/users/roeintheglasses/statistics?client_id=${accessToken}`,
      {
        method: 'GET',
      }
    );

    const unsplashdata = await response.json();

    return new Response(
      JSON.stringify({
        downloads: unsplashdata?.downloads?.total ?? 0,
        views: unsplashdata?.views?.total ?? 0,
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
    return new Response(JSON.stringify({ downloads: 0, views: 0 }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
}
