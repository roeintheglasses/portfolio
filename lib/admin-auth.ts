import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authConfig } from '@/pages/api/auth/[...nextauth]';

/**
 * Check if an email is in the admin whitelist
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map((e) => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

/**
 * Get admin session for API routes
 * Returns the session if user is authenticated AND is an admin
 * Returns null otherwise
 */
export async function getAdminSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authConfig);

  if (!session?.user?.email) {
    return null;
  }

  if (!isAdminEmail(session.user.email)) {
    return null;
  }

  return session;
}

/**
 * Higher-order function to protect API routes with admin authorization
 */
export function withAdminAuth(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    session: NonNullable<Awaited<ReturnType<typeof getAdminSession>>>
  ) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getAdminSession(req, res);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return handler(req, res, session);
  };
}
