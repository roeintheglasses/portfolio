import type { NextApiRequest, NextApiResponse } from 'next';
import { searchLocations, reverseGeocode } from '@/lib/geocoding';
import type { GeocodeResult } from '@/lib/types';

interface GeocodeSuccessResponse {
  results?: GeocodeResult[];
  placeName?: string;
}

interface GeocodeErrorResponse {
  error: string;
}

type GeocodeResponse = GeocodeSuccessResponse | GeocodeErrorResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<GeocodeResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, lat, lng } = req.query;

    // Forward geocoding (query string to coordinates)
    if (query && typeof query === 'string') {
      const results = await searchLocations(query);
      return res.status(200).json({ results });
    }

    // Reverse geocoding (coordinates to place name)
    if (lat !== undefined && lng !== undefined) {
      const latNum = parseFloat(lat as string);
      const lngNum = parseFloat(lng as string);

      if (isNaN(latNum) || isNaN(lngNum)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
      }

      const placeName = await reverseGeocode({ lat: latNum, lng: lngNum });
      return res.status(200).json({ placeName: placeName || undefined });
    }

    return res.status(400).json({ error: 'Query or coordinates required' });
  } catch (error) {
    console.error('Geocoding error:', error);
    return res.status(500).json({ error: 'Geocoding failed' });
  }
}
