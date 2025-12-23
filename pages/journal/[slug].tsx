import { GetStaticProps, GetStaticPaths } from 'next';
import { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { IconArrowLeft } from '@tabler/icons-react';
import { sanityClient, isSanityConfigured } from '@/sanity/lib/client';
import { storyBySlugQuery, storySlugsQuery } from '@/sanity/lib/queries';
import { getImageUrl } from '@/sanity/lib/image';
import type { PhotoStory, GeoPoint } from '@/lib/types';
import JournalHero from '@/components/journal/JournalHero';
import GalleryGrid from '@/components/journal/GalleryGrid';

// Dynamic import for navigation components
const ScrollProgressBar = dynamic(() => import('@/components/journal/ScrollProgressBar'), {
  ssr: false,
});

const PhotoCounter = dynamic(() => import('@/components/journal/PhotoCounter'), {
  ssr: false,
});

const JourneySummary = dynamic(() => import('@/components/journal/JourneySummary'), {
  ssr: false,
});

interface JournalPageProps {
  story: PhotoStory | null;
}

export default function JournalPage({ story }: JournalPageProps) {
  // Extract photo locations for the map
  const photoLocations = useMemo(() => {
    if (!story?.photos) return [];
    return story.photos
      .map((photo, index) => ({
        coordinates: photo.coordinates as GeoPoint,
        index,
      }))
      .filter((item) => item.coordinates);
  }, [story]);

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Story not found</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This photo story doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const coverImageUrl = story.coverImage ? getImageUrl(story.coverImage, 1200, 630) : undefined;

  const photoCount = story.photos?.length || 0;

  return (
    <>
      <Head>
        <title>{story.title} - Photo Story</title>
        <meta name="description" content={story.summary || `Explore ${story.title}`} />
        <meta property="og:title" content={story.title} />
        <meta property="og:description" content={story.summary || `Explore ${story.title}`} />
        {coverImageUrl && <meta property="og:image" content={coverImageUrl} />}
        <meta property="og:type" content="article" />
        {story.date && <meta property="article:published_time" content={story.date} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={story.title} />
        <meta name="twitter:description" content={story.summary || `Explore ${story.title}`} />
        {coverImageUrl && <meta name="twitter:image" content={coverImageUrl} />}
      </Head>

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <JournalHero story={story} photoCount={photoCount} />

        {/* Back to Stories link */}
        <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link
              href="/stories"
              className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <IconArrowLeft className="h-4 w-4" />
              Back to Stories
            </Link>
          </div>
        </div>

        {/* Photo Counter - Fixed position */}
        <PhotoCounter photos={story.photos || []} />

        {/* Gallery Section */}
        <main className="mx-auto max-w-7xl px-4 py-12">
          <GalleryGrid photos={story.photos || []} title={story.title} />
        </main>

        {/* Journey Summary with Map (at end) */}
        {story.route && story.route.length > 0 && (
          <JourneySummary story={story} photoLocations={photoLocations} />
        )}

        {/* Footer */}
        <footer className="border-t border-gray-200 py-8 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              <IconArrowLeft className="h-4 w-4" />
              Explore More Stories
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (!isSanityConfigured()) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  try {
    const slugs = await sanityClient.fetch<string[]>(storySlugsQuery);

    return {
      paths: slugs.map((slug) => ({ params: { slug } })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching story slugs:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<JournalPageProps> = async ({ params }) => {
  const slug = params?.slug as string;

  if (!isSanityConfigured()) {
    return {
      props: { story: null },
      revalidate: 60,
    };
  }

  try {
    const story = await sanityClient.fetch<PhotoStory | null>(storyBySlugQuery, {
      slug,
    });

    if (!story) {
      return {
        notFound: true,
      };
    }

    return {
      props: { story },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching story:', error);
    return {
      props: { story: null },
      revalidate: 60,
    };
  }
};
