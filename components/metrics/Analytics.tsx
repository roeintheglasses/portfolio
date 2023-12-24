import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import MetricCard from 'components/metrics/Card';

export default function AnalyticsCard() {
  const { data } = useSWR<Views>('/api/views', fetcher);

  const pageViews = new Number(data?.total);
  const link = 'https://roeintheglasses.tech';

  return (
    <MetricCard
      header="All-Time Blog Views"
      link={link}
      metric={pageViews}
      isCurrency={false}
      gradient="from-[#242136] via-[#10223d] to-[#240f38]"
    />
  );
}
