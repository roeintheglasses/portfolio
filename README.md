# roeintheglasses portfolio

A modern, responsive portfolio website built with Next.js showcasing work experience, skills, and personal projects.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.7.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-4.0.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

## ✨ Features

- **🌙 Dark/Light Mode** - Seamless theme switching with next-themes
- **📱 Responsive Design** - Mobile-first design using Tailwind CSS
- **🎨 Interactive Components** - Animated gradient backgrounds using THREE.js and Framer Motion
- **🎵 Real-time Spotify Integration** - Now Playing and Top Tracks via Spotify API
- **🎮 Gaming Integration** - Valorant stats display via Valorant API
- **💬 Guestbook System** - User messages with OAuth authentication via NextAuth.js
- **📊 Analytics** - Vercel Analytics and Speed Insights integration
- **🔍 SEO Ready** - Automatic sitemap generation and meta tags
- **🎯 Sound Effects** - Interactive sound feedback using use-sound
- **📈 View Counter** - Page view tracking with Prisma and PostgreSQL

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Three.js](https://threejs.org/)** - 3D graphics with React Three Fiber

### Backend & Database

- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[Prisma ORM](https://prisma.io/)** - Database toolkit and ORM
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution

### APIs & Integrations

- **[Spotify Web API](https://developer.spotify.com/)** - Music integration
- **[Valorant API](https://henrikdev.xyz/)** - Gaming statistics
- **[Vercel Analytics](https://vercel.com/analytics)** - Performance monitoring

### UI Components & Icons

- **[Tabler Icons](https://tabler-icons.io/)** - Icon library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon collection
- **[Headless UI](https://headlessui.com/)** - Unstyled UI components

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[SWR](https://swr.vercel.app/)** - Data fetching library

## 📁 Project Structure

```
portfolio/
├── components/           # Reusable React components
│   ├── ChipStack/       # Interactive skill chips
│   ├── metrics/         # Analytics and API integrations
│   └── ...              # UI components
├── data/                # Static data files
│   ├── workEx.js        # Work experience data
│   ├── about.js         # About information
│   └── nav.js           # Navigation configuration
├── lib/                 # Utility functions and helpers
│   ├── Coolers/         # Color and gradient generators
│   ├── spotify.ts       # Spotify API client
│   ├── prisma.ts        # Database client
│   └── utils.ts         # Utility functions
├── pages/               # Next.js pages and API routes
│   ├── api/             # Backend API endpoints
│   │   ├── auth/        # Authentication routes
│   │   ├── guestbook/   # Guestbook API
│   │   ├── now-playing.ts
│   │   ├── top-tracks.ts
│   │   └── valorant.ts
│   └── ...              # Frontend pages
├── prisma/              # Database schema and migrations
├── public/              # Static assets
│   ├── static/          # Images and media
│   └── sounds/          # Audio files
└── styles/              # Global CSS and component styles
```

## 🚀 Key Features Implementation

### 💼 Work Experience

- Dynamic work cards with gradient backgrounds
- Detailed company information and achievements
- Responsive timeline layout with company logos
- Current role at Adpushup as SDE & Team Lead

### 🎯 Tech Stack & Skills

- Interactive skill chips with custom gradients
- Icon integration for visual appeal
- Categorized technology expertise including:
  - **Frontend**: React, React Native, Next.js, TypeScript, JavaScript, CSS, TailwindCSS
  - **Backend**: Node.js, Express
  - **Testing**: Jest, Cypress
  - **Databases**: MongoDB, Couchbase, RabbitMQ

### 🎵 Real-time Integrations

- **Spotify**: Now playing track and top tracks display
- **Valorant**: Gaming statistics and rank information
- **GitHub**: Repository information and contributions

### 🎨 Interactive Elements

- Animated gradient backgrounds using Three.js
- Smooth page transitions with Framer Motion
- Sound effects for user interactions
- Responsive mobile menu with animations
- Theme switching with persistent state

### 📊 Analytics & Performance

- Vercel Analytics integration
- Page view tracking
- Performance monitoring
- SEO optimization

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 16.13+
- PostgreSQL database (recommended: Neon's serverless postgres)
- Spotify API credentials (optional)
- Valorant API access (optional)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**

```bash
yarn install
```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Spotify API (optional)
SPOTIFY_CLIENT_ID="your-spotify-client-id"
SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"

# Valorant API (optional)
VALORANT_API_KEY="your-valorant-api-key"
VALORANT_PUUID="your-valorant-puuid"
```

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🎨 Customization

### Adding Work Experience

Edit `data/workEx.js` to add or modify work experience entries.

### Updating Skills

Modify the skills array in `pages/index.tsx` to update your tech stack.

### Styling

The application uses Tailwind CSS for styling. Custom styles can be added in `styles/global.css`.

### Adding New Integrations

- Create new API routes in `pages/api/`
- Add corresponding components in `components/metrics/`
- Update types in `lib/types.ts`

## 📝 License

This project is licensed under License I made up - see the [LICENSE.txt](LICENSE.txt) file for details.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/roeintheglasses">Hrishikesh Jangir</a></p>
  <p>Feel free to ⭐ this repository if you found it helpful!</p>
</div>
