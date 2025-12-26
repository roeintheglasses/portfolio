import Image from 'next/image';
import { BLUR_DATA_URL } from '@/lib/constants';

interface TrackProps {
  ranking: number;
  albumImageUrl: string;
  title: string;
  songUrl: string;
  artist: string;
}

export default function Track({ ranking, albumImageUrl, title, songUrl, artist }: TrackProps) {
  return (
    <div className="mt-4 flex w-full flex-row items-center border-b border-gray-200 dark:border-gray-800">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-600">{ranking}</p>
      <Image
        className="top-5 mx-3 self-center rounded-md"
        src={albumImageUrl}
        alt={title}
        width={45}
        height={45}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
      <div className="my-2 flex flex-col">
        <a
          className="w-60 truncate font-medium text-gray-900 dark:text-gray-100 xl:w-96"
          href={songUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${title} by ${artist} on Spotify`}
        >
          {title}
        </a>
        <p className="w-60 truncate text-gray-500 xl:w-96">{artist}</p>
      </div>
    </div>
  );
}
