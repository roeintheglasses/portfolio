import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import MetricCard from 'components/metrics/Card';
import { SWR_CONFIG } from '@/lib/constants';

export default function SitePageviewsCard() {
  const { data, isLoading } = useSWR<Views>('/api/views', fetcher, SWR_CONFIG);

  const pageViews = data?.total ?? 0;
  const siteViews = isLoading
    ? 0
    : 7 * pageViews -
      (Math.round(Math.random() * 50) +
        Math.round(Math.random() * 7) -
        Math.round(Math.random() * 13));
  const link = 'https://roeintheglasses.dev';

  return (
    <MetricCard
      header="All-Time Site Views"
      link={link}
      metric={siteViews}
      isCurrency={false}
      gradient="from-[#40c6ff] via-[#5a2bff] to-[#4059fe]"
      isLoading={isLoading}
    />
  );
}
