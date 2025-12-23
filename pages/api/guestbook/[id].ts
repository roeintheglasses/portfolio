import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authConfig } from 'pages/api/auth/[...nextauth]';

import prisma from 'lib/prisma';

const guestbookUpdateSchema = z.object({
  body: z
    .string()
    .min(1, 'Message is required')
    .max(500, 'Message must be 500 characters or less')
    .transform((val) => val.trim()),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authConfig);

  const { id } = req.query;

  const entry = await prisma.guestbook.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!entry) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  if (req.method === 'GET') {
    return res.json({
      id: entry.id.toString(),
      body: entry.body,
      created_by: entry.created_by,
      updated_at: entry.updated_at,
    });
  }

  const email = session?.user?.email;

  if (!session || !email || email !== entry.email) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method === 'DELETE') {
    await prisma.guestbook.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(204).json({});
  }

  if (req.method === 'PUT') {
    const validation = guestbookUpdateSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: validation.error.errors[0]?.message || 'Invalid input',
      });
    }

    await prisma.guestbook.update({
      where: {
        id: Number(id),
      },
      data: {
        body: validation.data.body,
        updated_at: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      ...entry,
      body: validation.data.body,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
