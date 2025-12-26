import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withAdminAuth } from '@/lib/admin-auth';
import { generateWalkContent, type GeneratedContent } from '@/lib/gemini';

// Zod schemas for request validation
const GeoPointSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const PhotoMetadataSchema = z.object({
  index: z.number(),
  filename: z.string(),
  camera: z.string().optional(),
  lens: z.string().optional(),
  aperture: z.string().optional(),
  shutterSpeed: z.string().optional(),
  iso: z.string().optional(),
  focalLength: z.string().optional(),
  date: z.string().optional(),
  location: GeoPointSchema.optional(),
});

const StoryContextSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  date: z.string(),
  mood: z.string().optional(),
  storyHints: z.string().optional(),
  highlights: z.string().optional(),
});

const GenerateContentRequestSchema = z.object({
  photos: z.array(PhotoMetadataSchema).min(1, 'At least one photo is required'),
  context: StoryContextSchema,
});

interface GenerateContentResponse {
  content?: GeneratedContent;
  error?: string;
  details?: z.ZodIssue[];
}

async function handler(req: NextApiRequest, res: NextApiResponse<GenerateContentResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate request body with Zod
  const validation = GenerateContentRequestSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid request data',
      details: validation.error.issues,
    });
  }

  try {
    const { photos, context } = validation.data;

    const content = await generateWalkContent(photos, context);

    return res.status(200).json({ content });
  } catch (error) {
    console.error('Error generating content:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate content',
    });
  }
}

export default withAdminAuth(handler);
