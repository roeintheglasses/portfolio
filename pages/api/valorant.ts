import { z } from 'zod';
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

const emptyResponse = () =>
  new Response(JSON.stringify(emptyValoData), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });

// Schema for validating Valorant API response
const ValorantImagesSchema = z.object({
  small: z.string(),
  large: z.string(),
  triangle_down: z.string(),
  triangle_up: z.string(),
});

const ValorantCurrentDataSchema = z.object({
  currenttier: z.number(),
  currenttierpatched: z.string(),
  images: ValorantImagesSchema,
  ranking_in_tier: z.number().optional(),
  mmr_change_to_last_game: z.number().optional(),
  elo: z.number().optional(),
  games_needed_for_rating: z.number().optional(),
  old: z.boolean().optional(),
});

const ValorantHighestRankSchema = z.object({
  old: z.boolean().optional(),
  tier: z.number(),
  patched_tier: z.string(),
  season: z.string().optional(),
  converted: z.number().optional(),
});

const ValorantSeasonSchema = z.object({
  wins: z.number().optional(),
  number_of_games: z.number().optional(),
});

const ValorantDataSchema = z.object({
  name: z.string().optional(),
  tag: z.string().optional(),
  current_data: ValorantCurrentDataSchema.nullable().optional(),
  highest_rank: ValorantHighestRankSchema.nullable().optional(),
  by_season: z.record(ValorantSeasonSchema).optional(),
});

const ValorantResponseSchema = z.object({
  status: z.number(),
  data: ValorantDataSchema.optional(),
});

export default async function handler() {
  try {
    const valoPlayerUUID = process.env.VALORANT_PUUID;
    const valoAPIKey = process.env.VALORANT_API_KEY;

    if (!valoPlayerUUID || !valoAPIKey) {
      console.error('Valorant API credentials not configured');
      return emptyResponse();
    }

    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/ap/${valoPlayerUUID}`,
      {
        method: 'GET',
        headers: {
          Authorization: valoAPIKey,
        },
      }
    );

    if (!response.ok) {
      console.error(`Valorant API returned status: ${response.status}`);
      return emptyResponse();
    }

    let rawData: unknown;
    try {
      rawData = await response.json();
    } catch (parseError) {
      console.error('Failed to parse Valorant response JSON:', parseError);
      return emptyResponse();
    }

    // Validate response structure
    const parsed = ValorantResponseSchema.safeParse(rawData);

    if (!parsed.success) {
      console.error('Invalid Valorant response structure:', parsed.error.message);
      return emptyResponse();
    }

    if (parsed.data.status !== 200 || !parsed.data.data) {
      return emptyResponse();
    }

    const fetchedData = parsed.data.data;
    const { name, tag, highest_rank, current_data, by_season } = fetchedData;
    const { wins, games } = fetchTotalNumberOfMatchesPlayed(by_season ?? {});
    const tierData = fetchTierData(
      current_data as CurrentRank | null,
      highest_rank as HighestRank | null
    );

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
    return emptyResponse();
  }
}
