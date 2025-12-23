import { GoogleGenAI, Type } from '@google/genai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey && process.env.NODE_ENV === 'production') {
  console.warn('GOOGLE_GEMINI_API_KEY is not set');
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface PhotoMetadata {
  index: number;
  filename: string;
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  focalLength?: string;
  date?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface StoryContext {
  title: string;
  location: string;
  date: string;
  mood?: string;
  storyHints?: string;
  highlights?: string;
}

export interface GeneratedContent {
  summary: string;
  introduction: string;
}

// Schema for structured JSON output
const contentResponseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A compelling one-line summary for the gallery card, max 200 characters',
    },
    introduction: {
      type: Type.STRING,
      description:
        'A short introductory paragraph (2-3 sentences) setting the scene for this photo story',
    },
  },
  required: ['summary', 'introduction'],
};

export async function generateStoryContent(
  photos: PhotoMetadata[],
  context: StoryContext
): Promise<GeneratedContent> {
  if (!ai) {
    throw new Error(
      'Gemini API not configured. Please set GOOGLE_GEMINI_API_KEY environment variable.'
    );
  }

  // Build detailed photo descriptions from EXIF
  const photoDetails = photos
    .map((p, i) => {
      const parts = [`Photo ${i + 1}`];
      if (p.camera) parts.push(`shot on ${p.camera}`);
      if (p.lens) parts.push(`with ${p.lens}`);
      if (p.aperture && p.shutterSpeed) parts.push(`at ${p.aperture}, ${p.shutterSpeed}`);
      if (p.iso) parts.push(`ISO ${p.iso}`);
      if (p.focalLength) parts.push(`${p.focalLength}`);
      if (p.date) parts.push(`taken ${p.date}`);
      return parts.join(' ');
    })
    .join('\n');

  // Get unique cameras used
  const cameras = [...new Set(photos.map((p) => p.camera).filter(Boolean))];

  // Get date range
  const dates = photos
    .map((p) => p.date)
    .filter(Boolean)
    .sort();
  const dateInfo =
    dates.length > 0
      ? dates.length === 1
        ? dates[0]
        : `${dates[0]} to ${dates[dates.length - 1]}`
      : context.date;

  const prompt = `You are a photography curator writing content for a photo gallery website.

STORY TITLE: "${context.title}"
LOCATION: ${context.location}
DATE: ${dateInfo}
CAMERAS USED: ${cameras.join(', ') || 'Unknown'}
NUMBER OF PHOTOS: ${photos.length}
${context.mood ? `MOOD/ATMOSPHERE: ${context.mood}` : ''}
${context.storyHints ? `STORY HINTS: ${context.storyHints}` : ''}

PHOTO EXIF DATA:
${photoDetails}

Generate content for this photography gallery:

1. SUMMARY: A single compelling sentence (max 200 chars) that captures the essence of this story. This appears on gallery cards.

2. INTRODUCTION: 2-3 sentences that set the scene. Mention the location, time of day (infer from EXIF if possible), and the photographic approach. Be evocative but concise.

Write in first person, present tense. Be authentic, not promotional. Let the technical details inspire artistic observations.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: contentResponseSchema,
        temperature: 0.8,
        maxOutputTokens: 512,
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error('No response from Gemini');
    }

    // Clean up the response - remove any markdown formatting
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.slice(7);
    }
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.slice(3);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.slice(0, -3);
    }
    cleanText = cleanText.trim();

    try {
      const parsed = JSON.parse(cleanText) as GeneratedContent;
      return parsed;
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      // Return fallback content
      return {
        summary: `A photo story from ${context.location}`,
        introduction: `Exploring ${context.location} with ${photos.length} photographs captured on ${context.date}.`,
      };
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Gemini API error: ${String(error)}`);
  }
}

// Alias for backward compatibility
export const generateWalkContent = generateStoryContent;
