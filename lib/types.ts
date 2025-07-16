
export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};


export type GitHub = {
  stars: number;
};

export type Valorant = {
  name: string;
  tag: string;
  currentRankImage: string;
  highestRankImage: string;
  currentRank: string;
  highestRank: string;
  totalWins: number;
  totalGames: number;
};

export type CurrentRank = {
  currenttier: number;
  currenttierpatched: string;
  images: ValImages;
  ranking_in_tier: number;
  mmr_change_to_last_game: number;
  elo: number;
  games_needed_for_rating: number;
  old: boolean;
};

export type ValImages = {
  small: string;
  large: string;
  triangle_down: string;
  triangle_up: string;
};

export type HighestRank = {
  old: boolean;
  tier: number;
  patched_tier: string;
  season: string;
  converted: number;
};

export type Unsplash = {
  downloads: number;
  views: number;
};

export type Gradient = {
  gradient: string;
};

export type ChipData = {
  gradient: string;
  chipName: string;
  icon: any;
};
