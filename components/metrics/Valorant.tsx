'use client';

import useSWR from 'swr';
import Image from 'next/image';
import { motion } from 'motion/react';
import fetcher from 'lib/fetcher';
import { Valorant } from 'lib/types';
import { Skeleton } from 'components/ui/Skeleton';
import { ICON_BLUR_DATA_URL, SWR_CONFIG } from '@/lib/constants';

// Valorant-inspired gradient
const valGradient = {
  border: 'from-[#ff4655] via-[#ff7b8a] to-[#bd3944]',
  text: 'from-[#ff4655] to-[#ff7b8a]',
  glow: 'rgba(255, 70, 85, 0.15)',
};

function ValorantSkeleton() {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-gray-300 to-gray-400 p-[1px] dark:from-gray-700 dark:to-gray-600">
      <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
        {/* Header skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Skeleton variant="text" width={150} height={28} className="mb-2" />
            <Skeleton variant="text" width={80} height={20} />
          </div>
          <Skeleton variant="rectangular" width={40} height={40} className="rounded-lg" />
        </div>

        {/* Ranks skeleton */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
            >
              <Skeleton variant="circular" width={80} height={80} className="mb-3" />
              <Skeleton variant="text" width={100} height={20} className="mb-1" />
              <Skeleton variant="text" width={70} height={16} />
            </div>
          ))}
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-800">
              <Skeleton variant="text" width={40} height={24} className="mx-auto mb-1" />
              <Skeleton variant="text" width={50} height={14} className="mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface RankDisplayProps {
  image: string;
  rank: string;
  label: string;
  isPeak?: boolean;
}

function RankDisplay({ image, rank, label, isPeak = false }: RankDisplayProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col items-center rounded-xl border border-gray-200 bg-gray-100/50 p-4 dark:border-gray-700 dark:bg-gray-800/50 sm:p-6 ${isPeak ? 'ring-1 ring-amber-400/30' : ''} `}
    >
      <div className="relative">
        <Image
          src={image}
          placeholder="blur"
          blurDataURL={ICON_BLUR_DATA_URL}
          alt={`${rank} rank icon`}
          width={80}
          height={80}
          className="drop-shadow-lg"
        />
        {isPeak && (
          <span className="absolute -right-1 -top-1 text-lg text-amber-500" title="Peak Rank">
            ★
          </span>
        )}
      </div>
      <h4 className="mt-3 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">{rank}</h4>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </motion.div>
  );
}

interface StatItemProps {
  value: string | number;
  label: string;
  highlight?: boolean;
}

function StatItem({ value, label, highlight = false }: StatItemProps) {
  return (
    <div className="rounded-lg bg-gray-100/50 p-3 text-center dark:bg-gray-800/50">
      <p
        className={`text-lg font-bold sm:text-xl ${highlight ? 'text-[#ff4655]' : 'text-gray-900 dark:text-white'} `}
      >
        {value}
      </p>
      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{label}</p>
    </div>
  );
}

export default function ValorantStats() {
  const { data, error, isLoading } = useSWR<Valorant>('/api/valorant', fetcher, SWR_CONFIG);

  if (error) {
    return (
      <div className="w-full rounded-xl bg-gray-100 p-6 text-center dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Unable to load Valorant stats right now</p>
      </div>
    );
  }

  if (isLoading || !data) return <ValorantSkeleton />;

  const {
    name,
    tag,
    currentRankImage,
    highestRankImage,
    currentRank,
    highestRank,
    totalWins,
    totalGames,
  } = data;

  const winRate = totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(1) : '0';
  const losses = totalGames - totalWins;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Main card with gradient border */}
      <div
        className={`rounded-xl bg-gradient-to-r p-[1px] ${valGradient.border} motion-safe:animate-gradient-xy`}
      >
        <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900 sm:p-6">
          {/* Header: Player info */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                {name}
                <span className="text-base font-normal text-gray-400 dark:text-gray-500 sm:text-lg">
                  #{tag}
                </span>
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Asia Pacific</p>
            </div>
            <a
              href="https://playvalorant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Visit Valorant website"
            >
              <svg className="h-6 w-6 text-[#ff4655]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 2L2 22h9.5L22 2h-9.5zm-1.5 4.5L15.5 18H6l5-11.5z" />
              </svg>
            </a>
          </div>

          {/* Ranks comparison */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">
            <RankDisplay image={currentRankImage} rank={currentRank} label="Current Rank" />
            <RankDisplay image={highestRankImage} rank={highestRank} label="Peak Rank" isPeak />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <StatItem value={totalGames} label="Games" />
            <StatItem value={totalWins} label="Wins" />
            <StatItem value={losses} label="Losses" />
            <StatItem value={`${winRate}%`} label="Win Rate" highlight />
          </div>

          {/* Footer note */}
          <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
            Stats updated via Henrik API
          </p>
        </div>
      </div>
    </motion.div>
  );
}
