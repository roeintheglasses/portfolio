import Analytics from 'components/metrics/Analytics';
import Container from 'components/Container';
import GitHub from 'components/metrics/Github';
import Link from 'next/link';
import TopTracks from 'components/TopTracks';
import Valorant from 'components/metrics/Valorant';
import Unsplash from 'components/metrics/Unsplash';
import YouTube from 'components/metrics/Youtube';
import SitePageviewsCard from 'components/metrics/Pageviews';
import { preload } from 'swr';
import fetcher from 'lib/fetcher';

export default function About() {
  return (
    <Container
      title="About - Hrishikesh Jangir"
      description="All the info you can need about me."
    >
      <div className="max-w-5xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About
        </h1>
        <div className="text-gray-700 text-l dark:text-gray-300 mb-16 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400 max-w-5xl">
          <p>
            Hey there! I'm Hrishikesh Jangir, a 25-year-old Software Engineer
            based in Delhi, India. I have a passion for designing, building &
            shipping great tech products. Here are a few highlights about me:
            <ul>
              <li>
                <strong>Education :</strong> I did my initial from Rajasthan and
                then later moved to Delhi for higher education. I Hold a
                Bachelor of Technology (B.Tech) in Computer Science and
                Engineering from{' '}
                <strong>
                  Manav Rachna International Institute of Research and Studies.
                </strong>
              </li>
              <li>
                <strong>Professional Experience:</strong> Currently I work as a
                SDE/Team Lead at{' '}
                <a href="https://adpushup.com/">Adpushup Inc.</a> where me and
                my team works on building, maintaining, improving, and scaling
                the FrameRate player (An Instream Video Player) and FloorSense
                (A Dynamic Floor price manager) across publisher websites.{' '}
                <Link href={'/work'}>
                  You can read more about my work here.
                </Link>
              </li>
              <li>
                <strong>Some Quirky Facts:</strong> When I'm not immersed in
                coding, you can find me exploring the latest tech trends,
                experimenting with new software tools, and sharing my knowledge
                with the tech community. I'm also a huge fan of tinkering with
                ai modals and algorithms (Real-ESRGAN being my most recent
                obsession). I also enjoy writing about my tech experiences on my
                personal portfolio/blog and Usually when I am done with tech you
                can find me catching up to the latest manga chapters, Jamming on
                spotify and playing Valorant.
              </li>
            </ul>
          </p>
          <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            Links & Stats :{' '}
          </h2>
          <ul>
            <li>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/hrishikesh-jangir/">
                Hrishikesh Jangir
              </a>
            </li>
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
          </ul>
        </div>
        {/* <div className="flex flex-col w-full">
        <Unsplash />
        <YouTube />
      </div> */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 my-2 w-full">
          <SitePageviewsCard />
          <Analytics />
          <GitHub />
        </div>

        <div className="text-gray-700 text-l dark:text-gray-300 mb-16 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400 max-w-5xl">
          <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            Valorant Stats
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Sometimes, spreadsheets just don't cut it. When I need a brain
            break, I head to Valorant for some good old-fashioned gamer-y
            mayhem. Chamber's my architect of chaos, and Jett's the queen of
            outplays. My stats might not scream pro-gamer, but hey, the K/D
            ratio isn't everything (wink wink):
          </p>
        </div>
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
