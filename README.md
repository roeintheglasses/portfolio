# roeintheglasses portolio

## Features

* Responsive design using Tailwind CSS
* Dynamic blog articles using Next.js and Markdown
* Animated gradient background using `@tabler/icons-react`
* Customizable skills section with icons and gradients
* Work experience section with customizable cards

## Built With

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Overview

- `layouts/*` - The different page layouts each MDX category (blog, snippets) uses.
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API Routes](https://nextjs.org/docs/api-routes/introduction) powering [`/dashboard`](https://leerob.io/dashboard), newsletter subscription, guestbook, and post views.
- `pages/blog/*` - Static pre-rendered blog pages using MDX.
- `pages/dashboard` - [Personal dashboard](https://leerob.io/dashboard) tracking metrics.
- `pages/sitemap.xml.tsx` - Automatically generated sitemap.
- `pages/feed.xml.tsx` - Automatically generated RSS feed.
- `pages/*` - All other static pages.
- `prisma/*` - Prisma schema, which uses a PlanetScale MySQL database.
- `public/*` - Static assets including fonts and images.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.

## Running Locally

This application requires Node.js v16.13+. Clone the repo and follow t

```bash
yarn
yarn dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/leerob/leerob.io/blob/main/.env.example).
