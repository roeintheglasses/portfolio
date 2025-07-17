# roeintheglasses portfolio

A modern, responsive portfolio website built with Next.js showcasing work experience, skills, and personal projects.

## Features

- **Dark/Light Mode** - Seamless theme switching with next-themes
- **Responsive Design** - Mobile-first design using Tailwind CSS
- **Interactive Components** - Animated gradient backgrounds using THREE.js and Framer Motion
- **Real-time Integrations** - Spotify Now Playing and Top Tracks via Spotify API
- **Gaming Integration** - Valorant stats display via Valorant API
- **Guestbook System** - User messages with OAuth authentication via NextAuth.js
- **Dynamic Content** - Work experience and skills sections with customizable data
- **Performance Optimized** - Vercel Analytics and Speed Insights integration
- **SEO Ready** - Automatic sitemap generation and meta tags

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with TypeScript
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **3D Graphics**: [Three.js](https://threejs.org/) with React Three Fiber
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Tabler Icons](https://tabler-icons.io/) and [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Project Structure

- `components/` - Reusable React components including UI elements, cards, and interactive features
- `data/` - Static data files for work experience, about information, and navigation
- `lib/` - Utility functions, API clients, and helper modules
- `pages/` - Next.js pages and API routes
  - `api/` - Backend API endpoints for external integrations
  - `auth/` - Authentication pages
- `prisma/` - Database schema and migrations
- `public/` - Static assets (images, fonts, sounds)
- `styles/` - Global CSS and component-specific styles

## Key Features Implementation

### Work Experience

- Dynamic work cards with gradient backgrounds
- Detailed company information and achievements
- Responsive timeline layout

### Skills & Tech Stack

- Interactive skill chips with custom gradients
- Icon integration for visual appeal
- Categorized technology expertise

### Real-time Integrations

- **Spotify**: Now playing track and top tracks display
- **Valorant**: Gaming statistics and achievements
- **GitHub**: Repository information and contributions

### Interactive Elements

- Animated gradient backgrounds using Three.js
- Smooth page transitions with Framer Motion
- Sound effects for user interactions
- Responsive mobile menu

## Getting Started

### Prerequisites

- Node.js 16.13+
- PostgreSQL database (I use Neon's serverless postgres)
- Spotify API credentials (optional)
- Valorant API access (optional)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies

```bash
yarn install
```

3. Set up environment variables
   Create a `.env.local` file with the following variables:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
SPOTIFY_CLIENT_ID="your-spotify-client-id"
SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"
```

4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Customization

### Adding Work Experience

Edit `data/work.js` to add or modify work experience entries.

### Updating Skills

Modify the skills array in `pages/index.tsx` to update your tech stack.

### Styling

The application uses Tailwind CSS for styling. Custom styles can be added in `styles/global.css`.

## License

This project is licensed under the License I made up - see the [LICENSE.txt](LICENSE.txt) file for details.
