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
      
      {/* First Row: NowPlaying */}
      <div className="w-full mb-8">
        <NowPlaying />
      </div>
      
      {/* Second Row: Navigation Links */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-6 mb-8">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="text-gray-500 hover:text-blue-300 transition">
            Home
          </Link>
          <Link href="/work" className="text-gray-500 hover:text-blue-300 transition">
            Work
          </Link>
          <Link href="/about" className="text-gray-500 hover:text-blue-300 transition">
            About
          </Link>
          <Link href="/guestbook" className="text-gray-500 hover:text-blue-300 transition">
            Guestbook
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <ExternalLink href="mailto:hrkjangir@gmail.com">Email</ExternalLink>
          <ExternalLink href="https://linkedin.com/roeintheglasses">LinkedIn</ExternalLink>
          <ExternalLink href="https://github.com/roeintheglasses">GitHub</ExternalLink>
        </div>
      </div>
      
      {/* Third Row: Made with love */}
      <div className="w-full flex justify-center">
        <p className="bg-transparent z-10 font-sans text-sm text-center text-gray-700 dark:text-gray-300">
          Made with ❤️ & 🪄
        </p>
      </div>
    </footer>
  );
}
