import { CurrentRank, HighestRank } from 'lib/types';

export const config = {
  runtime: 'edge',
};

interface SeasonData {
  wins?: number;
  number_of_games?: number;
}

function fetchTotalNumberOfMatchesPlayed(seasonData: Record<string, SeasonData>) {
  let wins = 0;
  let games = 0;
  Object.keys(seasonData).forEach((ep) => {
    const season = seasonData[ep];
    if (season?.wins) wins += season.wins;
    if (season?.number_of_games) games += season.number_of_games;
  });

  return { wins, games };
}

interface TierData {
  currentRankImage: string;
  highestRankImage: string;
  currentRank: string;
  highestRank: string;
}

function fetchTierData(
  currRankData: CurrentRank | null | undefined,
  highestRankData: HighestRank | null | undefined
): TierData | null {
  if (!currRankData || !highestRankData || !currRankData?.images) return null;
  const imageData = currRankData.images;
  const imageUrlSplitter = `/${currRankData.currenttier}/`;

  const currentRankImage = imageData.large;

  const baseImageUrl = imageData.large.split(imageUrlSplitter)[0];
  const highestRankImage = `${baseImageUrl}/${highestRankData.tier}/largeicon.png`;

  return {
    currentRankImage,
    highestRankImage,
    currentRank: currRankData.currenttierpatched,
    highestRank: highestRankData.patched_tier,
  };
}

const emptyValoData = {
  name: '',
  tag: '',
  highestRank: '',
  currentRank: '',
  currentRankImage: '',
  highestRankImage: '',
  totalWins: 0,
  totalGames: 0,
};

export default async function handler() {
  try {
    const valoPlayerUUID = process.env.VALORANT_PUUID || 'f08db3f6-25ac-51d1-8b79-043233cfcd77';
    const valoAPIKey = process.env.VALORANT_API_KEY || '';
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/ap/${valoPlayerUUID}?api_key=${valoAPIKey}`,
      {
        method: 'GET',
      }
    );

    const data = await response.json();

    if (data?.status !== 200) {
      return new Response(JSON.stringify(emptyValoData), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    const fetchedData = data.data;
    const { name, tag, highest_rank, current_data, by_season } = fetchedData;
    const { wins, games } = fetchTotalNumberOfMatchesPlayed(by_season ?? {});
    const tierData = fetchTierData(current_data, highest_rank);

    const valoData = {
      name: name ?? '',
      tag: tag ?? '',
      currentRankImage: tierData?.currentRankImage ?? '',
      highestRankImage: tierData?.highestRankImage ?? '',
      currentRank: tierData?.currentRank ?? '',
      highestRank: tierData?.highestRank ?? '',
      totalWins: wins,
      totalGames: games,
    };

    return new Response(JSON.stringify(valoData), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    console.error('Failed to fetch Valorant data:', err);
    return new Response(JSON.stringify(emptyValoData), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
}
