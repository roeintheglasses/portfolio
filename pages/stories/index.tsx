import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import Container from '@/components/Container';
import { sanityClient, isSanityConfigured } from '@/sanity/lib/client';
import { allStoriesQuery } from '@/sanity/lib/queries';
import type { PhotoStoryPreview } from '@/lib/types';

// Dynamic import for StoriesLayout to avoid SSR issues with mapbox-gl
const StoriesLayout = dynamic(() => import('@/components/stories/StoriesLayout'), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-500 dark:border-gray-600 dark:border-t-indigo-400" />
    </div>
  ),
});

interface StoriesPageProps {
  stories: PhotoStoryPreview[];
}

export default function StoriesPage({ stories }: StoriesPageProps) {
  return (
    <Container
      title="Stories - Photo Stories"
      description="Explore street photography through an interactive map. Discover photo stories from locations around the world."
    >
      <div className="mx-auto mb-16 w-full max-w-5xl">
        {/* Animated Page Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl"
        >
          Stories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
        >
          Explore photography through geography and time. Discover photo stories from locations
          around the world.
        </motion.p>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {stories.length > 0 ? (
            <StoriesLayout stories={stories} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white/50 py-16 text-center backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
              <div className="max-w-md px-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  No photo stories yet
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {isSanityConfigured() ? (
                    <>
                      Add your first photo story in{' '}
                      <a
                        href="/studio"
                        className="text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        Sanity Studio
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      Configure Sanity CMS to start adding photo stories. Add your Sanity project
                      credentials to{' '}
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400">
                        .env.local
                      </code>
                      .
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<StoriesPageProps> = async () => {
  let stories: PhotoStoryPreview[] = [];

  if (isSanityConfigured()) {
    try {
      stories = await sanityClient.fetch(allStoriesQuery);
    } catch (error) {
      console.error('Error fetching stories from Sanity:', error);
    }
  }

  return {
    props: {
      stories,
    },
    revalidate: 60, // Revalidate every minute
  };
};
