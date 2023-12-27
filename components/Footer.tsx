import Link from 'next/link';
import NowPlaying from 'components/NowPlaying';

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-blue-300 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-5xl mx-auto w-full mb-8 relative bg-transparent z-10">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <NowPlaying />
      <div className="w-full max-w-5xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="text-gray-500 hover:text-blue-300 transition"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="text-gray-500 hover:text-blue-300 transition"
          >
            Work
          </Link>
          <Link
            href="/about"
            className="text-gray-500 hover:text-blue-300 transition"
          >
            About
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://linkedin.com/roeintheglasses">
            LinkedIn
          </ExternalLink>
          <ExternalLink href="https://github.com/roeintheglasses">
            GitHub
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/blog"
            className="text-gray-500 hover:text-blue-300 transition"
          >
            Blog
          </Link>
          <Link
            href="/guestbook"
            className="text-gray-500 hover:text-blue-300 transition"
          >
            Guestbook
          </Link>
          <Link
            href="/snippets"
            className="text-gray-500 hover:text-blue-300 transition"
          >
            Snippets
          </Link>
        </div>
      </div>
    </footer>
  );
}
