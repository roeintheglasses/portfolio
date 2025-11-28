import { generateGradientString } from '../../lib/Coolers/gradientGen';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  try {
    const colorGradient = generateGradientString();
    return new Response(JSON.stringify({ gradient: colorGradient }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    console.error('Failed to generate gradient:', err);
    return new Response(JSON.stringify({ gradient: 'from-blue-500 to-purple-500' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
}
