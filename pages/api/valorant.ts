import { type NextRequest } from 'next/server';

import { Valorant, CurrentRank, HighestRank } from 'lib/types';

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

function fetchTierData(
  currRankData: CurrentRank,
  highestRankData: HighestRank
) {
  if (!currRankData || !highestRankData || !currRankData?.images) return null;
  let imageData = currRankData.images;
  let imageUrlSplitter = `/${currRankData.currenttier}/`;

  let currentRankImage = imageData.large;

  let baseImageUrl = imageData.large.split(imageUrlSplitter)[0];
  let highestRankImage = `${baseImageUrl}/${highestRankData.tier}/largeicon.png`;

  return {
    currentRankImage,
    highestRankImage,
    currentRank: currRankData.currenttierpatched,
    highestRank: highestRankData.patched_tier
  };
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
    let valoData = {
      name: '',
      tag: '',
      highestRank: '',
      currentRank: '',
      currentRankImage: '',
      highestRankImage: '',
      totalWins: 0,
      totalGames: 0
    };
    const data = await response.json();

    if (data?.status === 200) {
      let fetchedData = data.data;
      let { name, tag, highest_rank, current_data, by_season } = fetchedData;
      let { wins, games } = fetchTotalNumberOfMatchesPlayed(by_season);
      let { currentRankImage, highestRankImage, currentRank, highestRank } =
        fetchTierData(current_data, highest_rank);
      valoData = {
        name,
        tag,
        currentRankImage,
        highestRankImage,
        currentRank,
        highestRank,
        totalWins: wins,
        totalGames: games
      };
    }

    return new Response(JSON.stringify(valoData), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
      }
    });
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  }
}
