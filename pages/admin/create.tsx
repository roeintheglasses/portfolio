'use client';

import { useSession, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { IconArrowLeft, IconLoader2, IconLock } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { authConfig } from '@/pages/api/auth/[...nextauth]';
import { useCreateStoryStore } from '@/store/createStoryStore';
import type { PhotoMetadata, StoryContext } from '@/lib/gemini';

// Dynamic import to avoid SSR issues with dnd-kit
const CreateStoryForm = dynamic(() => import('@/components/admin/CreateStoryForm'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <IconLoader2 className="h-8 w-8 animate-spin text-indigo-500" />
    </div>
  ),
});

interface CreateStoryPageProps {
  isAdmin: boolean;
  userEmail: string | null;
}

export default function CreateStoryPage({ isAdmin, userEmail }: CreateStoryPageProps) {
  const { data: session, status } = useSession();
  const {
    photos,
    metadata,
    context,
    setIsGenerating,
    setGeneratedContent,
    setIsUploading,
    setIsPublishing,
    setPhotoAssetRef,
    setError,
    reset,
  } = useCreateStoryStore();

  // Reset on unmount
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleGenerateContent = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Prepare photo metadata for the API
      const photoMetadata: PhotoMetadata[] = photos.map((photo, index) => ({
        index,
        filename: photo.filename,
        camera: photo.exif?.camera,
        lens: photo.exif?.lens,
        aperture: photo.exif?.aperture,
        shutterSpeed: photo.exif?.shutter,
        iso: photo.exif?.iso?.toString(),
        focalLength: photo.exif?.focalLength,
        date: photo.exif?.takenAt,
        location: photo.coordinates,
      }));

      // Prepare context
      const storyContext: StoryContext = {
        title: metadata.title,
        location: metadata.locationName,
        date: metadata.date,
        mood: context.mood,
        storyHints: context.storyHints,
        highlights: context.highlights,
      };

      const response = await fetch('/api/admin/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: photoMetadata, context: storyContext }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate content');
      }

      const { content } = await response.json();
      setGeneratedContent(content.summary, content.introduction);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate content');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [photos, metadata, context, setIsGenerating, setGeneratedContent, setError]);

  const handlePublish = useCallback(
    async (options: { published: boolean; featured: boolean }): Promise<string | null> => {
      setIsUploading(true);
      setError(null);

      try {
        // Upload all photos to Sanity
        for (const photo of photos) {
          if (!photo.assetRef) {
            const formData = new FormData();
            formData.append('file', photo.file);

            const response = await fetch('/api/admin/upload-asset', {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              const data = await response.json();
              throw new Error(data.error || 'Failed to upload photo');
            }

            const { assetId } = await response.json();
            setPhotoAssetRef(photo.id, assetId);
          }
        }

        setIsUploading(false);
        setIsPublishing(true);

        // Get the latest photos with asset refs
        const store = useCreateStoryStore.getState();

        // Build photo data for the API
        const photoData = store.photos.map((photo) => ({
          assetId: photo.assetRef!,
          caption: photo.caption,
          coordinates: photo.coordinates,
          exif: photo.exif,
          isFullBleed: photo.isFullBleed,
        }));

        const response = await fetch('/api/admin/create-story', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: metadata.title,
            slug: metadata.slug,
            date: metadata.date,
            location: {
              name: metadata.locationName,
              coordinates: metadata.coordinates,
            },
            summary: store.summary,
            photos: photoData,
            tags: metadata.tags,
            published: options.published,
            featured: options.featured,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to create story');
        }

        const { slug } = await response.json();
        return slug;
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to publish');
        throw error;
      } finally {
        setIsUploading(false);
        setIsPublishing(false);
      }
    },
    [photos, metadata, setIsUploading, setIsPublishing, setPhotoAssetRef, setError]
  );

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <IconLoader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  // Not signed in
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
        <Head>
          <title>Sign In - Create Story</title>
        </Head>
        <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center">
          <IconLock className="mx-auto h-12 w-12 text-gray-600" />
          <h1 className="mt-4 text-xl font-semibold text-white">Sign In Required</h1>
          <p className="mt-2 text-gray-400">Please sign in to access the story creator.</p>
          <button
            onClick={() => signIn()}
            className="mt-6 w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Not an admin
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
        <Head>
          <title>Access Denied</title>
        </Head>
        <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center">
          <IconLock className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-xl font-semibold text-white">Access Denied</h1>
          <p className="mt-2 text-gray-400">You don&apos;t have permission to access this page.</p>
          <p className="mt-1 text-sm text-gray-500">
            Signed in as: {userEmail || session.user?.email}
          </p>
          <Link
            href="/stories"
            className="mt-6 inline-block rounded-lg border border-gray-700 px-6 py-2 text-gray-300 hover:bg-gray-800"
          >
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>Create Story - Admin</title>
      </Head>

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/stories"
              className="flex items-center gap-2 text-gray-400 hover:text-white"
            >
              <IconArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Stories</span>
            </Link>
            <div className="h-6 w-px bg-gray-700" />
            <h1 className="text-lg font-semibold text-white">Create Story</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="hidden sm:inline">{session.user?.email}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CreateStoryForm onGenerateContent={handleGenerateContent} onPublish={handlePublish} />
      </main>
    </div>
  );
}

// Server-side check for admin access
export const getServerSideProps: GetServerSideProps<CreateStoryPageProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authConfig);

  const userEmail = session?.user?.email || null;

  // Check admin status on the server where env vars are available
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map((e) => e.trim().toLowerCase()) || [];
  const isAdmin = userEmail ? adminEmails.includes(userEmail.toLowerCase()) : false;

  return {
    props: {
      isAdmin,
      userEmail,
    },
  };
};
