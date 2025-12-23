import { defineType, defineField } from 'sanity';

export const photoStory = defineType({
  name: 'photoStory',
  title: 'Photo Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Location Name',
          type: 'string',
          description: 'e.g., Old Delhi, India',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'coordinates',
          title: 'Coordinates',
          type: 'customGeopoint',
          description: 'Center point of the story',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief description for the grid card (max 280 chars)',
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: 'route',
      title: 'Route',
      type: 'array',
      of: [{ type: 'customGeopoint' }],
      description: 'Array of coordinates defining the path',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'storyPhoto' }],
      description: 'Gallery photos for this story',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to make this story visible on the site',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this story prominently',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location.name',
      media: 'coverImage',
      published: 'published',
      featured: 'featured',
    },
    prepare({ title, location, media, published, featured }) {
      const badges: string[] = [];
      if (featured) badges.push('Featured');
      if (!published) badges.push('Draft');

      return {
        title: title || 'Untitled Story',
        subtitle: [location, badges.length ? `[${badges.join(', ')}]` : null]
          .filter(Boolean)
          .join(' '),
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date, Oldest',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
