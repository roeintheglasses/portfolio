import type { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth } from '@/lib/admin-auth';
import {
  generateWalkContent,
  type PhotoMetadata,
  type StoryContext,
  type GeneratedContent,
} from '@/lib/gemini';

interface GenerateContentRequest {
  photos: PhotoMetadata[];
  context: StoryContext;
}

interface GenerateContentResponse {
  content?: GeneratedContent;
  error?: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<GenerateContentResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { photos, context } = req.body as GenerateContentRequest;

    if (!photos || photos.length === 0) {
      return res.status(400).json({ error: 'No photos provided' });
    }

    if (!context.title || !context.location) {
      return res.status(400).json({ error: 'Title and location are required' });
    }

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
