import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { withAdminAuth } from '@/lib/admin-auth';
import { previewClient, isSanityConfigured } from '@/sanity/lib/client';
import type { StoryPhoto, SanityImage } from '@/lib/types';

// Zod schemas for request validation
const GeoPointSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const ExifDataSchema = z.object({
  camera: z.string().optional(),
  lens: z.string().optional(),
  aperture: z.string().optional(),
  shutter: z.string().optional(),
  iso: z.number().optional(),
  focalLength: z.string().optional(),
  takenAt: z.string().optional(),
});

const PhotoDataSchema = z.object({
  assetId: z.string().min(1, 'Asset ID is required'),
  caption: z.string().optional(),
  coordinates: GeoPointSchema.optional(),
  exif: ExifDataSchema.optional(),
  isFullBleed: z.boolean().optional(),
});

const CreateStoryRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  date: z.string().optional(),
  location: z.object({
    name: z.string().min(1, 'Location name is required'),
    coordinates: GeoPointSchema.optional(),
  }),
  summary: z.string().optional(),
  photos: z.array(PhotoDataSchema).min(1, 'At least one photo is required'),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
});

type CreateStoryRequest = z.infer<typeof CreateStoryRequestSchema>;
type PhotoData = z.infer<typeof PhotoDataSchema>;

interface CreateStoryResponse {
  slug?: string;
  error?: string;
  details?: z.ZodIssue[];
}

function createStoryPhoto(photo: PhotoData): StoryPhoto {
  return {
    _key: nanoid(),
    _type: 'storyPhoto',
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: photo.assetId,
      },
    } as SanityImage,
    caption: photo.caption,
    coordinates: photo.coordinates,
    exif: photo.exif,
    isFullBleed: photo.isFullBleed,
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse<CreateStoryResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isSanityConfigured()) {
    return res.status(500).json({ error: 'Sanity is not configured' });
  }

  // Validate request body with Zod
  const validation = CreateStoryRequestSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid request data',
      details: validation.error.issues,
    });
  }

  try {
    const body = validation.data;
    const { title, slug, date, location, summary, photos, tags, published, featured } = body;

    // Build the photos array
    const storyPhotos = photos.map((photo) => createStoryPhoto(photo));

    // Build route from photo coordinates
    const route = photos
      .filter((p) => p.coordinates)
      .map((p) => ({
        lat: p.coordinates!.lat,
        lng: p.coordinates!.lng,
      }));

    // Get cover photo (first photo) - guaranteed to exist due to Zod validation (min: 1)
    const coverPhoto = photos[0]!;

    // Create the document
    const document = {
      _type: 'photoStory',
      title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      coverImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: coverPhoto.assetId,
        },
      },
      date,
      location: {
        name: location.name,
        coordinates: location.coordinates || (route[0] ? route[0] : { lat: 0, lng: 0 }),
      },
      summary,
      route,
      photos: storyPhotos,
      tags,
      published,
      featured,
    };

    await previewClient.create(document);

    return res.status(200).json({ slug });
  } catch (error) {
    console.error('Error creating story:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create story',
    });
  }
}

export default withAdminAuth(handler);
