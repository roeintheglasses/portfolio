import type { Metadata } from 'next';
import Link from 'next/link';
import Container from 'components/Container';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A summary of my work and contributions across companies.'
};

export default function WorkPage() {
  return (
    <Container title="Work - Hrishikesh Jangir">
      <section>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
          My work
        </h1>
        <div className="text-gray-700 text-l dark:text-gray-300 mb-16 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400 max-w-5xl">
          <p>
            Currently working on solving ad-tech problems at scale. I code for
            passion & design for fun. On a mission to build efficient and
            accessible products and help the next generation of devs along the
            way. Here's a summary of my work so far :
          </p>

          {/* Adpushup */}
          <>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Adpushup
            </h2>
            <h4 className="text-neutral-600 dark:text-neutral-400 text-sm">
              SDE & Team Lead (Instream Video)
            </h4>
            <p>
              I joined <a href="https://adpushup.com/">Adpushup</a> in 2021 as
              an <strong> Associate Software Developer</strong>. Initially, I
              worked on building the <strong> AMP Yield</strong> project, an
              in-house{' '}
              <strong>Ad analytics & performance monitoring system</strong> for
              AMP based sites AMP-based sites which allowed the company to reach
              out to over <strong> 200+</strong> new publishers with credible
              analytics data for onboarding.
            </p>
            <ul>
              <li>
                In 2022,
                <strong> I was promoted to SDE</strong> and the worked on the{' '}
                <a href="https://www.adpushup.com/glimpse/"> Glimpse </a>&
                <a href="https://www.adpushup.com/glimpse-for-ads/">
                  {' '}
                  Glimpse for Ads{' '}
                </a>
                project where we made publisher links come to life with stunning
                link previews.
              </li>
              <li>
                In 2022, I also led an internal product documentation team,
                Creating standards for our internal documentation on JIRA and
                Notion.
              </li>
              <li>
                Towards the end of 2022 and further in 2023, I started leading
                the development of our in-house video player solution and the
                Floor Engine. My team of 4 engineers worked on the development
                of a<a href="https://videojs.com/"> VideoJS </a>
                based player with support for
                <strong> Instream Video Ads </strong>
                utilizing
                <a href="https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side">
                  {' '}
                  Interactive Media Ads SDK{' '}
                </a>
                and
                <a href="https://docs.prebid.org/prebid/prebidjs.html">
                  {' '}
                  PrebidJS{' '}
                </a>
              </li>
              <li>
                In 2023, I also worked on Adpushup's floor price optimization
                engine designed specifically for video ads called{' '}
                <a href="https://www.adpushup.com/floor-sense/"> FloorSense </a>{' '}
                which utilized <strong>PySpark, TypeScript and NodeJs</strong>{' '}
                to dynamically generate price floors for ad bids based on
                historical data trends.
              </li>
            </ul>
            <p>
              Since I joined Adpushup in 2021, I have actively worked on and
              contributed to our internal ad-tech & the developer community. I
              got to work on creating new products from ground up (which have
              contributed to an{' '}
              <strong>uplift of around 30% in Gross Revenue.</strong>) while
              solving complex problems such as Building an end-to-end video
              transcoding pipeline, Building a video player catered for instream
              ads from ground up, Creating a dynamic floor price engine,
              Building a large scale system to crawl websites and generate
              previews for links and Even Creating custom videoJs plugins.
            </p>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
          </>
          {/* QuikieApps */}
          <>
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              QuikieApps
            </h2>
            <h4 className="text-neutral-600 dark:text-neutral-400 text-sm">
              SDE, 2020 — 2021
            </h4>
            <p>
              QuikieApps is a IT service and consulting company specializing in
              fullstack development. Here I joined a team of Developers working
              across web and mobile platforms on various client projects based
              on MERN Stack and React Native.
            </p>
            <p>
              On the team, I worked over 6 different client projects with
              <a href="https://react.dev/"> React </a>,
              <a href="https://reactnative.dev/"> React Native </a>
              and
              <a href="https://nodejs.org/en"> NodeJS </a>
              based codebase. I even worked on moving projects from a custom
              webpack and React configuration to
              <a href="https://nextjs.org/"> Next.js </a>
              and the latest React patterns.
            </p>
            <p>
              At QuikieApps, I was able to work on some hard problems:
              decoupling a decade old monolith into microservices, working on
              payment gateway integration such as
              <a href="https://razorpay.com/docs/#home-payments"> Razorpay </a>&
              <a href="https://docs.billdesk.io/"> BillDesk</a>, learning and
              occasionally managing a docker container, building and
              implementing a design system for our client apps, incrementally
              migrating individual components and routes to a new framework and
              infrastructure, and more.
            </p>
          </>

          {/* Safe Security */}
          <>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Safe Security
            </h2>
            <h4 className="text-neutral-600 dark:text-neutral-400 text-sm">
              Testing Automation Intern, 2019 — 2019
            </h4>
            <p>
              Safe Security is a Cybersecurity and Digital Risk Assessment
              platform that helps organizations measure and mitigate
              enterprise-wide cyber risk in real-time. At Safe I worked as an
              testing automation intern over the summer of 2019 and automated
              their core test cases using <strong>TestCafe</strong> and raised
              test coverage by 16%.
            </p>
          </>
        </div>
      </section>
    </Container>
  );
}
