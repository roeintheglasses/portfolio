import { defineType, defineField } from 'sanity';

export const storyPhoto = defineType({
  name: 'storyPhoto',
  title: 'Story Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Photo caption or description',
    }),
    defineField({
      name: 'locationName',
      title: 'Location Name',
      type: 'string',
      description: 'Specific location name (optional)',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'customGeopoint',
      description: 'GPS coordinates from EXIF data',
    }),
    defineField({
      name: 'exif',
      title: 'EXIF Data',
      type: 'object',
      fields: [
        { name: 'camera', title: 'Camera', type: 'string' },
        { name: 'lens', title: 'Lens', type: 'string' },
        { name: 'aperture', title: 'Aperture', type: 'string' },
        { name: 'shutter', title: 'Shutter Speed', type: 'string' },
        { name: 'iso', title: 'ISO', type: 'number' },
        { name: 'focalLength', title: 'Focal Length', type: 'string' },
        { name: 'takenAt', title: 'Date Taken', type: 'datetime' },
      ],
    }),
    defineField({
      name: 'isFullBleed',
      title: 'Full Bleed',
      type: 'boolean',
      description: 'Display this photo edge-to-edge',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      media: 'image',
      exif: 'exif',
    },
    prepare({ caption, media, exif }) {
      return {
        title: caption || 'Untitled Photo',
        subtitle: exif?.camera || '',
        media,
      };
    },
  },
});
