import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import prisma from 'lib/prisma';
import { authConfig } from 'pages/api/auth/[...nextauth]';

const guestbookEntrySchema = z.object({
  body: z
    .string()
    .min(1, 'Message is required')
    .max(500, 'Message must be 500 characters or less')
    .transform((val) => val.trim()),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    });

    return res.json(
      entries.map((entry) => ({
        id: entry.id.toString(),
        body: entry.body,
        created_by: entry.created_by,
        updated_at: entry.updated_at,
      }))
    );
  }

  const session = await getServerSession(req, res, authConfig);

  if (!session?.user?.email || !session?.user?.name) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { email, name } = session.user;

  if (req.method === 'POST') {
    const validation = guestbookEntrySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: validation.error.errors[0]?.message || 'Invalid input',
      });
    }

    const newEntry = await prisma.guestbook.create({
      data: {
        email,
        body: validation.data.body,
        created_by: name,
      },
    });

    return res.status(201).json({
      id: newEntry.id.toString(),
      body: newEntry.body,
      created_by: newEntry.created_by,
      updated_at: newEntry.updated_at,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
