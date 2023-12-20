import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'edge'
};

function fetchTotalNumberOfMatchesPlayed(seasonData: any) {
  let wins = 0;
  let games = 0;
  Object.keys(seasonData).forEach((ep) => {
    if (!!seasonData[ep].wins) wins += seasonData[ep].wins;

    if (!!seasonData[ep].number_of_games)
      games += seasonData[ep].number_of_games;
  });

  return { wins, games };
}

export default async function handler(req: NextRequest) {
  try {
    const valoPlayerUUID =
      process.env.VALORANT_PUUID || 'f08db3f6-25ac-51d1-8b79-043233cfcd77';
    //
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/ap/${valoPlayerUUID}`,
      {
        method: 'GET'
      }
    );
    let valoData = {};
    const data = await response.json();

    if (data?.status === 200) {
      let fetchedData = data.data;

      let { name, tag, highest_rank, current_data, by_season } = fetchedData;
      let { wins, games } = fetchTotalNumberOfMatchesPlayed(by_season);
      valoData = {
        name,
        tag,
        highestRank: highest_rank.patched_tier,
        currentRank: current_data.currenttierpatched,
        totalWins: wins,
        totalGames: games
      };
    }
    console.log(valoData);

    return new Response(
      JSON.stringify({
        data: valoData
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
        }
      }
    );
  } catch (error) {}
}
