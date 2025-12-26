import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { GitHub } from 'lib/types';
import MetricCard from 'components/metrics/Card';
import { SWR_CONFIG } from '@/lib/constants';

export default function GitHubCard() {
  const { data, isLoading } = useSWR<GitHub>('/api/github', fetcher, SWR_CONFIG);

  const stars = data?.stars ?? 0;
  const link = 'https://github.com/roeintheglasses';

  return (
    <MetricCard
      header="GitHub Stars"
      link={link}
      metric={stars}
      isCurrency={false}
      gradient="from-[#40c6ff] via-[#5a2bff] to-[#4059fe]"
      isLoading={isLoading}
    />
  );
}
