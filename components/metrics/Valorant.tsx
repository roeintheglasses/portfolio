import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Valorant } from 'lib/types';

export default function GitHubCard() {
  const { data } = useSWR<any>('/api/valorant', fetcher);

  let { data: valData } = data;

  return <div></div>;
}
