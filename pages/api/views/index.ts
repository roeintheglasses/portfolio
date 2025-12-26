import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch page views and unique visitors in parallel
    const [totalViews, uniqueVisitors] = await Promise.all([
      prisma.views.aggregate({
        _sum: {
          count: true,
        },
      }),
      prisma.visitors.count(),
    ]);

    return res.status(200).json({
      total: totalViews._sum.count ?? 0,
      visitors: uniqueVisitors,
    });
  } catch (error) {
    console.error('Failed to fetch total views:', error);
    return res.status(500).json({ error: 'Failed to fetch views' });
  }
}
