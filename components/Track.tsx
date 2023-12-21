import Image from 'next/image';
export default function Track(track) {
  return (
    <div className="flex flex-row items-center border-b border-gray-200 dark:border-gray-800 w-full mt-4">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-600">
        {track.ranking}
      </p>
      <Image
        className="mx-3 rounded-md top-5 self-center"
        src={track.albumImageUrl}
        alt={track.title}
        width={45}
        height={45}
      />
      <div className="flex flex-col my-2">
        <a
          className="font-medium text-gray-900 dark:text-gray-100 truncate w-60 sm:w-96"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p
          className="text-gray-500 truncate w-60 sm:w-96 md:w-full"
          color="gray.500"
        >
          {track.artist}
        </p>
      </div>
    </div>
  );
}
