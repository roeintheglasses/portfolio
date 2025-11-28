import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Unsplash } from 'lib/types';
import MetricCard from 'components/metrics/Card';

export default function UnsplashCard() {
  const { data, isLoading } = useSWR<Unsplash>('/api/unsplash', fetcher);

  const downloads = data?.downloads ?? 0;
  const views = data?.views ?? 0;
  const link = 'https://unsplash.com/@user';

  return (
    <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricCard
        header="Unsplash Downloads"
        link={link}
        metric={downloads}
        isCurrency={false}
        isLoading={isLoading}
      />
      <MetricCard
        header="Unsplash Views"
        link={link}
        metric={views}
        isCurrency={false}
        isLoading={isLoading}
      />
    </div>
  );
}
