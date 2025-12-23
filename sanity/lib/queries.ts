import { groq } from 'next-sanity';

/**
 * Get all published photo stories for the Stories view
 * Returns preview data (no full content)
 */
export const allStoriesQuery = groq`
  *[_type == "photoStory" && published == true] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    "coverImageLqip": coverImage.asset->metadata.lqip,
    date,
    location,
    summary,
    tags,
    featured,
    "photoCount": count(photos)
  }
`;

// Alias for backward compatibility
export const allWalksQuery = allStoriesQuery;

/**
 * Get a single photo story by slug with full photos
 */
export const storyBySlugQuery = groq`
  *[_type == "photoStory" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    date,
    location,
    summary,
    route,
    tags,
    featured,
    photos[] {
      _key,
      _type,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        hotspot,
        crop
      },
      caption,
      locationName,
      coordinates,
      exif,
      isFullBleed
    }
  }
`;

// Alias for backward compatibility
export const walkBySlugQuery = storyBySlugQuery;

/**
 * Get all story slugs for static generation
 */
export const storySlugsQuery = groq`
  *[_type == "photoStory" && published == true].slug.current
`;

// Alias for backward compatibility
export const walkSlugsQuery = storySlugsQuery;

/**
 * Get featured stories for homepage or highlights
 */
export const featuredStoriesQuery = groq`
  *[_type == "photoStory" && published == true && featured == true] | order(date desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    date,
    location,
    summary,
    "photoCount": count(photos)
  }
`;

// Alias for backward compatibility
export const featuredWalksQuery = featuredStoriesQuery;

/**
 * Get stories by tag
 */
export const storiesByTagQuery = groq`
  *[_type == "photoStory" && published == true && $tag in tags] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    date,
    location,
    summary,
    tags,
    "photoCount": count(photos)
  }
`;

// Alias for backward compatibility
export const walksByTagQuery = storiesByTagQuery;

/**
 * Get all unique tags from published stories
 */
export const allTagsQuery = groq`
  array::unique(*[_type == "photoStory" && published == true].tags[])
`;

/**
 * Get the next and previous stories for navigation
 */
export const adjacentStoriesQuery = groq`
  {
    "prev": *[_type == "photoStory" && published == true && date < $currentDate] | order(date desc) [0] {
      title,
      "slug": slug.current,
      "coverImageUrl": coverImage.asset->url
    },
    "next": *[_type == "photoStory" && published == true && date > $currentDate] | order(date asc) [0] {
      title,
      "slug": slug.current,
      "coverImageUrl": coverImage.asset->url
    }
  }
`;

// Alias for backward compatibility
export const adjacentWalksQuery = adjacentStoriesQuery;
