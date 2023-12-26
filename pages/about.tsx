import Analytics from 'components/metrics/Analytics';
import Container from 'components/Container';
import GitHub from 'components/metrics/Github';
import Link from 'next/link';
import TopTracks from 'components/TopTracks';
import Valorant from 'components/metrics/Valorant';
import Unsplash from 'components/metrics/Unsplash';
import YouTube from 'components/metrics/Youtube';

import { preload } from 'swr';
import fetcher from 'lib/fetcher';

preload('/api/valorant', fetcher);
export default function Dashboard() {
  return (
    <Container
      title="About - Hrishikesh Jangir"
      description="All the info you can need about me."
    >
      <div className="max-w-5xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About
        </h1>
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>
          <ul>
            <li>
              GitHub:{' '}
              <a href="https://github.com/roeintheglasses">@roeintheglasses</a>
            </li>
            <li>
              Website:{' '}
              <Link href="https://roeintheglasses.tech">
                roeintheglasses.tech
              </Link>
            </li>
            <li>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/hrishikesh-jangir/">
                Hrishikesh Jangir
              </a>
            </li>
          </ul>
        </div>
        {/* <div className="flex flex-col w-full">
        <Unsplash />
        <YouTube />
      </div> */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <Analytics />
          <GitHub />
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Valorant Stats
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Sometimes, spreadsheets just don't cut it. When I need a brain break,
          I head to Valorant for some good old-fashioned gamer-y mayhem.
          Chamber's my architect of chaos, and Jett's the queen of outplays. My
          stats might not scream pro-gamer, but hey, the K/D ratio isn't
          everything (wink wink):
        </p>
        <Valorant />

        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Curious what I'm currently jamming to? Here's my top tracks on Spotify
          updated daily.
        </p>
        <TopTracks />
      </div>
    </Container>
  );
}
