'use client';

import useSWR from 'swr';
import { motion } from 'motion/react';
import { IconEye, IconUsers } from '@tabler/icons-react';
import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import { Card } from 'components/ui/Card';
import { Skeleton } from 'components/ui/Skeleton';
import { SWR_CONFIG } from '@/lib/constants';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  isLoading?: boolean;
}

function StatItem({ icon, value, label, isLoading }: StatItemProps) {
  return (
    <div className="flex flex-1 items-center justify-center gap-3 py-2 md:gap-4 md:py-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 md:h-12 md:w-12">
        {icon}
      </div>
      <div>
        {isLoading ? (
          <Skeleton variant="text" width={60} height={28} />
        ) : (
          <p className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            {value.toLocaleString()}
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="hidden h-12 w-px bg-gray-200 dark:bg-gray-700 md:block" aria-hidden="true" />
  );
}

interface SiteMetricsBannerProps {
  className?: string;
}

export default function SiteMetricsBanner({ className = '' }: SiteMetricsBannerProps) {
  const { data, isLoading } = useSWR<Views>('/api/views', fetcher, SWR_CONFIG);

  const pageViews = data?.total ?? 0;
  const uniqueVisitors = data?.visitors ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={className}
    >
      <Card hover={false} padding="md" className="w-full">
        <div className="flex flex-col items-stretch divide-y divide-gray-200 dark:divide-gray-700 md:flex-row md:items-center md:justify-around md:divide-x md:divide-y-0">
          <StatItem
            icon={<IconEye className="h-5 w-5 md:h-6 md:w-6" />}
            value={pageViews}
            label="Page Views"
            isLoading={isLoading}
          />
          <Divider />
          <StatItem
            icon={<IconUsers className="h-5 w-5 md:h-6 md:w-6" />}
            value={uniqueVisitors}
            label="Unique Visitors"
            isLoading={isLoading}
          />
        </div>
      </Card>
    </motion.div>
  );
}
