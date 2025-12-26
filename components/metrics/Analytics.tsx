import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import MetricCard from 'components/metrics/Card';
import { SWR_CONFIG } from '@/lib/constants';

export default function AnalyticsCard() {
  const { data, isLoading } = useSWR<Views>('/api/views', fetcher, SWR_CONFIG);

  const uniqueVisitors = data?.visitors ?? 0;
  const link = 'https://roeintheglasses.dev';

  return (
    <MetricCard
      header="Unique Visitors"
      link={link}
      metric={uniqueVisitors}
      isCurrency={false}
      gradient="from-[#f093fb] via-[#f5576c] to-[#4facfe]"
      isLoading={isLoading}
    />
  );
}
