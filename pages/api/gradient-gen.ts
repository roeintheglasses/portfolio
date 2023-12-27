import { type NextRequest } from 'next/server';
import { generateGradientString } from '../../lib/Coolers/gradientGen';
export const config = {
  runtime: 'edge'
};

export default async function handler(req: NextRequest) {
  try {
    const colorGradient = generateGradientString();
    return new Response(JSON.stringify({ gradient: colorGradient }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
      }
    });
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  }
}
