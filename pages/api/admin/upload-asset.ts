import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import { withAdminAuth } from '@/lib/admin-auth';
import { previewClient, isSanityConfigured } from '@/sanity/lib/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UploadAssetResponse {
  assetId?: string;
  error?: string;
}

function parseForm(req: NextApiRequest): Promise<{ file: File }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50MB limit
    });

    form.parse(req, (err, _fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file) {
        reject(new Error('No file uploaded'));
        return;
      }

      resolve({ file });
    });
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse<UploadAssetResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isSanityConfigured()) {
    return res.status(500).json({ error: 'Sanity is not configured' });
  }

  try {
    const { file } = await parseForm(req);

    // Read the file
    const fileBuffer = fs.readFileSync(file.filepath);

    // Upload to Sanity
    const asset = await previewClient.assets.upload('image', fileBuffer, {
      filename: file.originalFilename || 'image.jpg',
      contentType: file.mimetype || 'image/jpeg',
    });

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({ assetId: asset._id });
  } catch (error) {
    console.error('Error uploading asset:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to upload asset',
    });
  }
}

export default withAdminAuth(handler);
