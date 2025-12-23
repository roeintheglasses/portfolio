/**
 * Site Configuration
 *
 * This file contains all the personal/site-specific configuration.
 * When forking this project, update these values to customize for your own use.
 */

export const siteConfig = {
  // Personal Information
  name: 'Hrishikesh Jangir',
  title: 'Developer, writer, designer.',
  description: 'Front-end developer, JavaScript enthusiast, and an avid valorant player.',
  email: 'hrishikeshjangir@outlook.com',

  // Site URLs
  url: 'https://roeintheglasses.dev',
  ogImage: 'https://roeintheglasses.dev/static/images/roe-banner.png',

  // Social Links
  social: {
    github: 'https://github.com/roeintheglasses',
    linkedin: 'https://www.linkedin.com/in/hrishikesh-jangir/',
    twitter: '', // Optional
    instagram: '', // Optional
  },

  // Navigation
  nav: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/work' },
    { name: 'Projects', href: '/projects' },
    { name: 'Stories', href: '/stories' },
    { name: 'Guestbook', href: '/guestbook' },
  ],

  // Feature Flags - Enable/disable integrations
  features: {
    spotify: true,
    valorant: true,
    guestbook: true,
    analytics: true,
    stories: true,
  },

  // Valorant Configuration (if features.valorant is true)
  valorant: {
    region: 'Asia Pacific',
  },
};

// Type exports for use in components
export type SiteConfig = typeof siteConfig;
