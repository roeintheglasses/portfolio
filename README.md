# Portfolio

A modern, responsive portfolio website built with Next.js 15, featuring real-time integrations, interactive animations, and a beautiful UI.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![Portfolio Preview](public/static/images/roe-banner.png)

## Features

- **Dark/Light Mode** - Seamless theme switching with next-themes
- **Responsive Design** - Mobile-first design using Tailwind CSS
- **Interactive 3D Background** - Animated star field using Three.js
- **Spotify Integration** - Now Playing and Top Tracks display
- **Valorant Stats** - Gaming statistics via Henrik API
- **Guestbook** - User messages with OAuth authentication
- **View Counter** - Page view tracking with PostgreSQL
- **CI/CD Pipeline** - GitHub Actions for linting, testing, and building

## Tech Stack

| Category        | Technologies                          |
| --------------- | ------------------------------------- |
| **Framework**   | Next.js 15 (Pages Router), React 19   |
| **Language**    | TypeScript 5.7                        |
| **Styling**     | Tailwind CSS, Motion (Framer Motion)  |
| **Database**    | PostgreSQL (Neon), Prisma ORM         |
| **Auth**        | NextAuth.js (GitHub, Google, Discord) |
| **3D Graphics** | Three.js, React Three Fiber           |
| **Testing**     | Vitest, Playwright, Testing Library   |
| **CI/CD**       | GitHub Actions, Dependabot            |

## Quick Start

### Prerequisites

- Node.js 18.17+
- Yarn package manager
- PostgreSQL database ([Neon](https://neon.tech/) recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/roeintheglasses/portfolio.git
cd portfolio

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local

# Set up database
yarn db:generate
yarn db:push

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Create a `.env.local` file with:

```env
# Required
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (at least one required for guestbook)
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Optional Integrations
SPOTIFY_CLIENT_ID="..."
SPOTIFY_CLIENT_SECRET="..."
SPOTIFY_REFRESH_TOKEN="..."

VALORANT_API_KEY="..."
VALORANT_PUUID="..."
```

## Project Structure

```
portfolio/
├── components/           # React components
│   ├── metrics/          # API integration components (Spotify, Valorant, etc.)
│   ├── ui/               # Reusable UI components
│   └── ...
├── config/
│   └── site.ts           # Site configuration (customize this!)
├── data/                 # Static data
│   ├── work.ts           # Work experience
│   ├── about.ts          # About page content
│   └── nav.ts            # Navigation config
├── lib/                  # Utilities
│   ├── spotify.ts        # Spotify API client
│   ├── prisma.ts         # Database client
│   └── types.ts          # TypeScript types
├── pages/                # Next.js pages
│   └── api/              # API routes
├── prisma/               # Database schema
└── public/               # Static assets
```

## Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn typecheck    # Run TypeScript checks
yarn test         # Run unit tests
yarn test:e2e     # Run E2E tests
yarn validate     # Run all checks (typecheck, lint, format)
```

## Using as a Template

Want to use this as your own portfolio? Follow these steps:

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### 2. Update Site Configuration

Edit `config/site.ts` with your personal information:

```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title',
  description: 'Your description',
  url: 'https://your-domain.com',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
  },
  // ...
};
```

### 3. Update Content

| File                    | Content                           |
| ----------------------- | --------------------------------- |
| `data/about.ts`         | About page content and highlights |
| `data/work.ts`          | Work experience entries           |
| `pages/projects.tsx`    | Your projects                     |
| `public/static/images/` | Your images                       |

### 4. Update Metadata

- Replace `public/static/images/roe-banner.png` with your OG image
- Update `public/favicon.ico`
- Update social preview images

### 5. Configure Integrations (Optional)

- **Spotify**: Follow the [Spotify API setup guide](https://developer.spotify.com/documentation/web-api)
- **Valorant**: Get an API key from [Henrik's API](https://docs.henrikdev.xyz/)
- **OAuth**: Set up providers in the [NextAuth.js dashboard](https://next-auth.js.org/providers/)

### 6. Deploy

Deploy to [Vercel](https://vercel.com/) with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/roeintheglasses/portfolio)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a PR.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run checks (`yarn validate && yarn test`)
5. Commit with conventional commits (`git commit -m 'feat: add amazing feature'`)
6. Push and open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Vercel](https://vercel.com/) - Deployment platform
- [Henrik's Valorant API](https://docs.henrikdev.xyz/) - Gaming stats
- [Spotify Web API](https://developer.spotify.com/) - Music integration

---

<div align="center">
  <p>Built with care by <a href="https://github.com/roeintheglasses">Hrishikesh Jangir</a></p>
  <p>If you found this helpful, please consider giving it a star!</p>
</div>
