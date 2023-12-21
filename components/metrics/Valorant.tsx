import useSWR, { preload } from 'swr';

import fetcher from 'lib/fetcher';
import Image from 'next/image';
import MetricCard from './Card';

import { Valorant } from 'lib/types';

export default function ValorantStats() {
  const { data, error, isLoading } = useSWR<Valorant>('/api/valorant', fetcher);

  let valLink = 'https://playvalorant.com/en-gb/';

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const {
    name,
    tag,
    currentRankImage,
    highestRankImage,
    currentRank,
    highestRank,
    totalWins,
    totalGames
  } = data;

  return (
    <div className="flex flex-col items-center w-full mt-4">
      {/* Stats */}
      <div className="flex flex-row items-center justify-evenly mt-4 w-full">
        {/* Current */}
        <div className="flex flex-col items-center justify-center w-1/3 mt-4">
          <Image
            src={currentRankImage}
            placeholder="empty"
            alt="Valorant Rank"
            width={80}
            height={80}
            objectFit="contain"
          />
          <h4>Current Rank</h4>
          <p>{currentRank}</p>
        </div>

        {/* playerTag */}
        <div className="flex flex-col items-center justify-center w-1/3 mt-4">
          <Image
            src={'/static/images/valorant/CxJ.webp'}
            placeholder="empty"
            alt="Valorant Mains"
            width={350}
            height={300}
            quality={80}
          />
          <h2>{name}</h2>
          <h3>#{tag}</h3>
        </div>

        {/* Highest */}
        <div className="flex flex-col items-center justify-center w-1/3 mt-4">
          <Image
            src={highestRankImage}
            placeholder="empty"
            alt="Valorant Rank"
            width={80}
            height={80}
            objectFit="contain"
          />
          <h4>Highest Rank</h4>
          <p>{highestRank}</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        <MetricCard
          header="Games Played"
          link={valLink}
          metric={totalGames}
          isCurrency={false}
          gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
        />
        <MetricCard
          header="Games Won"
          link={valLink}
          metric={totalWins}
          isCurrency={false}
          gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
        />
      </div>
    </div>
  );
}
