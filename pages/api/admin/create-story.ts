import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { withAdminAuth } from '@/lib/admin-auth';
import { previewClient, isSanityConfigured } from '@/sanity/lib/client';
import type { StoryPhoto, GeoPoint, ExifData, SanityImage } from '@/lib/types';

interface PhotoData {
  assetId: string;
  caption?: string;
  coordinates?: GeoPoint;
  exif?: ExifData;
  isFullBleed?: boolean;
}

interface CreateStoryRequest {
  title: string;
  slug: string;
  date: string;
  location: {
    name: string;
    coordinates?: GeoPoint;
  };
  summary: string;
  photos: PhotoData[];
  tags: string[];
  published: boolean;
  featured: boolean;
}

interface CreateStoryResponse {
  slug?: string;
  error?: string;
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

  try {
    const body = req.body as CreateStoryRequest;
    const { title, slug, date, location, summary, photos, tags, published, featured } = body;

    if (!title || !slug || !location.name) {
      return res.status(400).json({ error: 'Title, slug, and location are required' });
    }

    if (photos.length === 0) {
      return res.status(400).json({ error: 'At least one photo is required' });
    }

    // Build the photos array
    const storyPhotos = photos.map((photo) => createStoryPhoto(photo));

    // Build route from photo coordinates
    const route = photos
      .filter((p) => p.coordinates)
      .map((p) => ({
        lat: p.coordinates!.lat,
        lng: p.coordinates!.lng,
      }));

    // Get cover photo (first photo)
    const coverPhoto = photos[0];
    if (!coverPhoto) {
      return res.status(400).json({ error: 'Cover photo is required' });
    }

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
