import { useEffect, useState } from 'react';

import Footer from 'components/Footer';
import Head from 'next/head';

import { useRouter } from 'next/router';
import StarsCanvas from './StarCanvas';
import Navbar from './Navbar';

export default function Container(props) {
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Hrishikesh Jangir - Developer, writer, designer.',
    description: `Front-end developer, JavaScript enthusiast, and an avid valorant player.`,
    image: 'https://roeintheglasses.tech/static/images/roe-banner.png',
    type: 'website',
    ...customMeta
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://roeintheglasses.tech${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://roeintheglasses.tech${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Hrishikesh Jangir" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <StarsCanvas />
      <div className="flex flex-col justify-center px-6 relative z-20">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <Navbar />
      </div>
      <main id="skip" className="flex flex-col justify-center px-8 ">
        <div className="flex flex-col justify-center items-start max-w-5xl border-gray-200 dark:border-gray-700 mx-auto pb-16 bg-transparent z-10 ">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
