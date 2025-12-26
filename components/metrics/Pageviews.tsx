import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import MetricCard from 'components/metrics/Card';
import { SWR_CONFIG } from '@/lib/constants';

export default function SitePageviewsCard() {
  const { data, isLoading } = useSWR<Views>('/api/views', fetcher, SWR_CONFIG);

  const totalViews = data?.total ?? 0;
  const link = 'https://roeintheglasses.dev';

  return (
    <MetricCard
      header="Page Views"
      link={link}
      metric={totalViews}
      isCurrency={false}
      gradient="from-[#40c6ff] via-[#5a2bff] to-[#4059fe]"
      isLoading={isLoading}
    />
  );
}
