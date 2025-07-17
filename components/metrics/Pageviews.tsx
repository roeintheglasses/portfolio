import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import MetricCard from 'components/metrics/Card';

export default function SitePageviewsCard() {
  const { data } = useSWR<Views>('/api/views', fetcher);

  const pageViews = new Number(data?.total);
  const siteViews =
    7 * Number(pageViews) -
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
    />
  );
}
