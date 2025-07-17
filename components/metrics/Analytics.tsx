import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import MetricCard from 'components/metrics/Card';

export default function AnalyticsCard() {
  const { data } = useSWR<Views>('/api/views', fetcher);

  const pageViews = new Number(data?.total);
  const link = 'https://roeintheglasses.dev';

  return (
    <MetricCard
      header="All-Time Page Views"
      link={link}
      metric={pageViews}
      isCurrency={false}
      gradient="from-[#40c6ff] via-[#5a2bff] to-[#4059fe]"
    />
  );
}
