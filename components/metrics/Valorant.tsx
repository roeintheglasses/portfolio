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

  let winPercentage = (totalWins / totalGames) * 100;

  return (
    <div className="flex flex-col items-center w-full mt-4 select-none">
      {/* Stats */}
      <div className="flex flex-row items-center mt-4 w-11/12 mb-10 ">
        {/* Current */}
        <div className="hidden md:block w-1/6"></div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/5 xl:w-1/6 md:mr-7 md:mt-28">
          <Image
            src={currentRankImage}
            placeholder="empty"
            alt="Valorant Rank"
            width={120}
            height={120}
            objectFit="contain"
          />
          <h4 className="font-bold text-2xl mt-2 bg-gradient-to-r from-[#becdd3] via-[#c2a2db] to-[#f2a0f5]   rgbTextUtil">
            {currentRank}
          </h4>
          <p className="font-bold text-lg bg-gradient-to-r  from-[#becdd3] via-[#c2a2db] to-[#f2a0f5]  rgbTextUtil">
            Current Rank
          </p>
        </div>

        {/* playerTag */}
        <div className="hidden md:flex flex-col items-center justify-center w-2/6 mt-4">
          <Image
            className="md:ml-9"
            src={'/static/images/valorant/CxJ.webp'}
            placeholder="empty"
            alt="Valorant Mains"
            width={320}
            height={320}
            quality={80}
          />
          <div className="w-3/4 h-full relative flex flex-row">
            <div className="text-center w-[52px] h-[52px] bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-transparent border-b-gray-800 border-l-gray-800 top-0 left-0 -mt-[53px] -ml-[25px] rotate-45 z-10 absolute"></div>
            <div className="text-center w-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-y-gray-800 border-x-transparent -mt-16 ">
              <h1 className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-[#eaf3ef] via-[#cd99f7] to-[#fa6cff]  rgbTextUtil -mt-1">
                {name}
              </h1>
              <h3 className="font-bold text-2xl md:text-lg bg-gradient-to-r from-[#eaf3ef] via-[#cd99f7] to-[#fa6cff] rgbTextUtil">
                #{tag}
              </h3>
            </div>
            <div className="text-center w-[52px] h-[52px] bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-transparent border-t-gray-800 border-r-gray-800 top-0 right-0 -mt-[53px] -mr-[25px] rotate-45 z-10 absolute"></div>
          </div>
        </div>

        {/* Highest */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/5 xl:w-1/6 md:ml-7 md:mt-28">
          <Image
            src={highestRankImage}
            placeholder="empty"
            alt="Valorant Rank"
            width={120}
            height={120}
            objectFit="contain"
          />
          <h4 className="font-bold text-2xl mt-2 bg-gradient-to-r  from-[#becdd3] via-[#c2a2db] to-[#f2a0f5]   rgbTextUtil">
            {highestRank}
          </h4>
          <p className="font-bold text-lg bg-gradient-to-r  from-[#becdd3] via-[#c2a2db] to-[#f2a0f5]   rgbTextUtil">
            Highest Rank
          </p>
        </div>
        <div className="hidden md:block w-1/6"></div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 my-2 w-full">
        <MetricCard
          header="Games Played"
          link={valLink}
          metric={totalGames}
          isCurrency={false}
          gradient="from-[#3b2626] via-[#3d1010] to-[#410c0c]"
          showSvg={false}
        />
        <MetricCard
          header="Games won"
          link={valLink}
          metric={totalWins}
          isCurrency={false}
          gradient="from-[#3b2626] via-[#3d1010] to-[#410c0c]"
          showSvg={false}
        />
        <MetricCard
          header="K/D"
          link={valLink}
          metric={1.2}
          isCurrency={false}
          gradient="from-[#3b2626] via-[#3d1010] to-[#410c0c]"
          showSvg={false}
        />
        <MetricCard
          header="Win rate"
          link={valLink}
          metric={winPercentage}
          isCurrency={false}
          gradient="from-[#3b2626] via-[#3d1010] to-[#410c0c]"
          showSvg={false}
        />
      </div>
    </div>
  );
}
