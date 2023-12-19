import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'edge'
};

export default async function handler(req: NextRequest) {
  const valoPlayerUUID =
    process.env.VALORANT_PUUID || 'f08db3f6-25ac-51d1-8b79-043233cfcd77';
  //
  const response = await fetch(
    `https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/ap/${valoPlayerUUID}`,
    {
      method: 'GET'
    }
  );

  const valoData = await response.json();

  return new Response(
    JSON.stringify({
      downloads: valoData.downloads.total,
      views: valoData.views.total
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
      }
    }
  );
}
