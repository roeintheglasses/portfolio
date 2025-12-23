import { defineType } from 'sanity';

export const geopoint = defineType({
  name: 'customGeopoint',
  title: 'Geographic Point',
  type: 'object',
  fields: [
    {
      name: 'lat',
      title: 'Latitude',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(-90).max(90).error('Latitude must be between -90 and 90'),
    },
    {
      name: 'lng',
      title: 'Longitude',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(-180).max(180).error('Longitude must be between -180 and 180'),
    },
  ],
  preview: {
    select: {
      lat: 'lat',
      lng: 'lng',
    },
    prepare({ lat, lng }) {
      return {
        title: lat && lng ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : 'No coordinates',
      };
    },
  },
});
