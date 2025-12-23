import dynamic from 'next/dynamic';

import Footer from 'components/Footer';
import Head from 'next/head';

import { useRouter } from 'next/router';
import Navbar from './Navbar';

// Lazy load Three.js canvas - reduces initial bundle by ~300KB
const StarsCanvas = dynamic(() => import('./StarCanvas'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 h-full w-full bg-gray-50 dark:bg-gray-900" />,
});

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
  fullWidth?: boolean;
  hideFooter?: boolean;
}

export default function Container(props: ContainerProps) {
  const { children, fullWidth, hideFooter, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Hrishikesh Jangir - Developer, writer, designer.',
    description: `Front-end developer, JavaScript enthusiast, and an avid valorant player.`,
    image: 'https://roeintheglasses.dev/static/images/roe-banner.png',
    type: 'website',
    ...customMeta,
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://roeintheglasses.dev${router.asPath}`} />
        <link rel="canonical" href={`https://roeintheglasses.dev${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Hrishikesh Jangir" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && <meta property="article:published_time" content={meta.date} />}
      </Head>
      <StarsCanvas />
      <div className="relative z-20 flex flex-col justify-center px-6">
        <Navbar />
      </div>
      <main className={fullWidth ? 'flex flex-col' : 'flex flex-col justify-center px-8'}>
        <div
          className={
            fullWidth
              ? 'z-10 flex flex-col bg-transparent'
              : 'z-10 mx-auto flex max-w-5xl flex-col items-start justify-center border-gray-200 bg-transparent pb-16 dark:border-gray-700'
          }
        >
          {children}
        </div>
        {!hideFooter && <Footer />}
      </main>
    </div>
  );
}
