import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { TopTracks } from 'lib/types';
import Track from 'components/Track';
import { TrackSkeleton } from 'components/ui/Skeleton';

export default function Tracks() {
  const { data, isLoading } = useSWR<TopTracks>('/api/top-tracks', fetcher);

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-1 gap-4 gap-x-6 sm:grid-cols-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <TrackSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data?.tracks?.length) {
    return <p className="text-gray-500 dark:text-gray-400">No tracks available at the moment.</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 gap-x-6 sm:grid-cols-2">
      {data.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </div>
  );
}
