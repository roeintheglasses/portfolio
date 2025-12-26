'use client';

import useSWR from 'swr';
import { motion } from 'motion/react';
import fetcher from 'lib/fetcher';
import { GitHubStats } from 'lib/types';
import { Skeleton } from 'components/ui/Skeleton';
import { SWR_CONFIG } from '@/lib/constants';

// GitHub-inspired gradient
const githubGradient = {
  border: 'from-[#2ea44f] via-[#58a6ff] to-[#8b949e]',
  text: 'from-[#58a6ff] to-[#2ea44f]',
};

function GithubStatsSkeleton() {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-gray-300 to-gray-400 p-[1px] dark:from-gray-700 dark:to-gray-600">
      <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
        {/* Header skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Skeleton variant="text" width={120} height={28} className="mb-2" />
            <Skeleton variant="text" width={80} height={20} />
          </div>
          <Skeleton variant="rectangular" width={40} height={40} className="rounded-lg" />
        </div>

        {/* Stats skeleton */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-800">
              <Skeleton variant="text" width={40} height={24} className="mx-auto mb-1" />
              <Skeleton variant="text" width={50} height={14} className="mx-auto" />
            </div>
          ))}
        </div>

        {/* Languages skeleton */}
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className="mb-1 flex justify-between">
                <Skeleton variant="text" width={80} height={16} />
                <Skeleton variant="text" width={40} height={16} />
              </div>
              <Skeleton variant="rectangular" height={8} className="w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatItemProps {
  value: string | number;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="rounded-lg bg-gray-100/50 p-3 text-center dark:bg-gray-800/50">
      <p className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">{value}</p>
      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{label}</p>
    </div>
  );
}

interface LanguageBarProps {
  name: string;
  percentage: number;
  color: string;
}

function LanguageBar({ name, percentage, color }: LanguageBarProps) {
  return (
    <div className="group">
      <div className="mb-1 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function GithubStatsCard() {
  const { data, error, isLoading } = useSWR<GitHubStats>('/api/github-stats', fetcher, SWR_CONFIG);

  if (error) {
    return (
      <div className="w-full rounded-xl bg-gray-100 p-6 text-center dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Unable to load GitHub stats right now</p>
      </div>
    );
  }

  if (isLoading || !data) return <GithubStatsSkeleton />;

  const { totalRepos, totalStars, followers, languages, accountAge } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Main card with gradient border */}
      <div
        className={`rounded-xl bg-gradient-to-r p-[2px] ${githubGradient.border} motion-safe:animate-gradient-xy`}
      >
        <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900 sm:p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                GitHub Activity
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {accountAge}+ years on GitHub
              </p>
            </div>
            <a
              href="https://github.com/roeintheglasses"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Visit GitHub profile"
            >
              <svg
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Quick stats */}
          <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-3">
            <StatItem value={totalRepos} label="Repos" />
            <StatItem value={totalStars} label="Stars" />
            <StatItem value={followers} label="Followers" />
          </div>

          {/* Languages section */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Top Languages
            </h4>
            <div className="space-y-3">
              {languages.map((lang) => (
                <LanguageBar
                  key={lang.name}
                  name={lang.name}
                  percentage={lang.percentage}
                  color={lang.color}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
            Based on public repository data
          </p>
        </div>
      </div>
    </motion.div>
  );
}
