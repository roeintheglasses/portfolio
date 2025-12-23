import { photoStory } from './photoStory';
import { geopoint } from './objects/geopoint';
import { exifData } from './objects/exifData';
import { storyPhoto } from './objects/storyPhoto';

export const schemaTypes = [
  // Documents
  photoStory,

  // Objects
  geopoint,
  exifData,
  storyPhoto,
];
