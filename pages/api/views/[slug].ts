import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import prisma from 'lib/prisma';

const slugSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-zA-Z0-9-_/]+$/, 'Invalid slug format');

const trackRequestSchema = z.object({
  visitorId: z
    .string()
    .length(36, 'Invalid visitor ID format')
    .regex(/^[a-f0-9-]+$/, 'Invalid visitor ID format')
    .optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  // Validate slug
  const slugValidation = slugSchema.safeParse(slug);
  if (!slugValidation.success) {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const validSlug = slugValidation.data;

  try {
    if (req.method === 'GET') {
      // Get views for a specific slug
      const viewRecord = await prisma.views.findUnique({
        where: { slug: validSlug },
      });

      return res.status(200).json({
        slug: validSlug,
        count: viewRecord?.count ?? 0,
      });
    }

    if (req.method === 'POST') {
      // Parse request body for visitor ID
      const bodyValidation = trackRequestSchema.safeParse(req.body);
      const visitorId = bodyValidation.success ? bodyValidation.data.visitorId : undefined;

      // Increment view count (upsert)
      const upsertedView = await prisma.views.upsert({
        where: { slug: validSlug },
        update: {
          count: {
            increment: 1,
          },
        },
        create: {
          slug: validSlug,
          count: 1,
        },
      });

      // Track unique visitor if ID provided
      if (visitorId) {
        await prisma.visitors.upsert({
          where: { id: visitorId },
          update: {
            last_seen: new Date(),
            page_views: {
              increment: 1,
            },
          },
          create: {
            id: visitorId,
            first_seen: new Date(),
            last_seen: new Date(),
            page_views: 1,
          },
        });
      }

      return res.status(200).json({
        slug: validSlug,
        count: upsertedView.count,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Failed to handle views:', error);
    return res.status(500).json({ error: 'Failed to handle views' });
  }
}
