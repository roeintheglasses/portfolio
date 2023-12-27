import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from 'lib/sanity';
import cn from 'classnames';

export default function FunctionCard({
  title,
  description,
  slug,
  logo,
  gradient = 'from-[#f2a6af] via-[#fb83c1] to-[#f9e862]',
  ...rest
}) {
  return (
    <Link
      href={`/snippets/${slug}`}
      className={cn(
        'rounded-xl w-full animate-gradient-xy bg-gradient-to-r p-1',
        gradient
      )}
      {...rest}
    >
      <div className="bg-gray-50 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-95 rounded-lg p-4 h-full">
        <Image
          alt={title}
          height={50}
          width={50}
          src={urlForImage(logo).url()}
          className="rounded-full border border-gray-600 dark:border-gray-400 border-opacity-40 dark:border-opacity-40"
        />
        <h3 className="text-lg font-bold text-left mt-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-1 text-gray-900 dark:text-gray-100">{description}</p>
      </div>
    </Link>
  );
}
