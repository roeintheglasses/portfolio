import { defineType } from 'sanity';

export const exifData = defineType({
  name: 'exifData',
  title: 'EXIF Data',
  type: 'object',
  fields: [
    {
      name: 'camera',
      title: 'Camera',
      type: 'string',
      description: 'Camera make and model (e.g., Sony A7III)',
    },
    {
      name: 'lens',
      title: 'Lens',
      type: 'string',
      description: 'Lens model (e.g., FE 24-70mm F2.8 GM)',
    },
    {
      name: 'focalLength',
      title: 'Focal Length',
      type: 'string',
      description: 'e.g., 35mm',
    },
    {
      name: 'aperture',
      title: 'Aperture',
      type: 'string',
      description: 'e.g., f/2.8',
    },
    {
      name: 'shutter',
      title: 'Shutter Speed',
      type: 'string',
      description: 'e.g., 1/250s',
    },
    {
      name: 'iso',
      title: 'ISO',
      type: 'number',
      description: 'e.g., 400',
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});
