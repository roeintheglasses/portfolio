import useSWR, { preload } from 'swr';

import fetcher from 'lib/fetcher';
import Image from 'next/image';
import MetricCard from './Card';
import { Valorant } from 'lib/types';
import cn from 'classnames';

let valGradient = 'from-[#a96ff1] via-[#fa71ff] to-[#ff71b8]';

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
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 md:mr-7 md:mt-28">
          <Image
            src={currentRankImage}
            placeholder="empty"
            alt="Valorant Rank"
            width={120}
            height={120}
          />
          <h4
            className={`font-bold text-2xl mt-2 bg-gray-900 dark:bg-gray-50 hover:bg-gradient-to-r ${valGradient} rgbTextUtil`}
          >
            {currentRank}
          </h4>
          <p
            className={`font-bold text-lg bg-gray-900 dark:bg-gray-50 hover:bg-gradient-to-r ${valGradient} rgbTextUtil`}
          >
            Current Rank
          </p>
        </div>

        {/* playerTag */}
        <div
          className={cn(
            'hidden md:flex flex-col items-center justify-center w-max mt-4 rounded-lg ',
            'p-1 bg-gradient-to-tr ',
            valGradient
          )}
        >
          <div className="bg-gray-50 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 rounded-md">
            <Image
              className="rounded-md object-cover object-top	h-96"
              src={'/static/images/valorant/champArt.webp'}
              placeholder="empty"
              alt="Valorant Mains"
              width={200}
              height={600}
              quality={80}
            />
            <div className="w-full h-full relative flex flex-row">
              <div className="text-center w-full bg-gray-50 bg-opacity-0 -mt-24">
                <h1 className="font-bold text-4xl md:text-5xl bg-gray-50 hover:bg-gradient-to-r from-[#a96ff1] via-[#fa71ff] to-[#ff71b8]  rgbTextUtil -mt-1">
                  {name}
                </h1>
                <h3 className="font-bold text-2xl md:text-lg bg-gray-50 hover:bg-gradient-to-r from-[#a96ff1] via-[#fa71ff] to-[#ff71b8] rgbTextUtil">
                  #{tag}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Highest */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 md:ml-7 md:mt-28">
          <Image
            src={highestRankImage}
            placeholder="empty"
            alt="Valorant Rank"
            width={120}
            height={120}
          />
          <h4
            className={`font-bold text-2xl mt-2 bg-gray-900 dark:bg-gray-50 hover:bg-gradient-to-r ${valGradient} rgbTextUtil`}
          >
            {highestRank}
          </h4>
          <p
            className={`font-bold text-lg bg-gray-900 dark:bg-gray-50 hover:bg-gradient-to-r ${valGradient} rgbTextUtil`}
          >
            Highest Rank
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 my-2 w-full">
        <MetricCard
          header="Games Played"
          link={valLink}
          metric={totalGames}
          isCurrency={false}
          gradient={valGradient}
          showSvg={false}
        />
        <MetricCard
          header="Games won"
          link={valLink}
          metric={totalWins}
          isCurrency={false}
          gradient={valGradient}
          showSvg={false}
        />
        <MetricCard
          header="K/D"
          link={valLink}
          metric={1.2}
          isCurrency={false}
          gradient={valGradient}
          showSvg={false}
        />
        <MetricCard
          header="Win rate"
          link={valLink}
          metric={winPercentage}
          isCurrency={false}
          gradient={valGradient}
          showSvg={false}
        />
      </div>
    </div>
  );
}
