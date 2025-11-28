# Contributing to Portfolio

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 18.17+ (LTS recommended)
- Yarn package manager
- PostgreSQL database (or use [Neon](https://neon.tech/) for serverless)

### Local Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required values (see [Environment Variables](#environment-variables) below).

4. **Set up the database**

   ```bash
   yarn db:generate
   yarn db:push
   ```

5. **Start the development server**

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

| Variable                | Required | Description                              |
| ----------------------- | -------- | ---------------------------------------- |
| `DATABASE_URL`          | Yes      | PostgreSQL connection string             |
| `NEXTAUTH_SECRET`       | Yes      | Secret for NextAuth.js sessions          |
| `NEXTAUTH_URL`          | Yes      | Base URL (http://localhost:3000 for dev) |
| `SPOTIFY_CLIENT_ID`     | No       | Spotify API client ID                    |
| `SPOTIFY_CLIENT_SECRET` | No       | Spotify API client secret                |
| `SPOTIFY_REFRESH_TOKEN` | No       | Spotify refresh token                    |
| `VALORANT_API_KEY`      | No       | Henrik Valorant API key                  |
| `VALORANT_PUUID`        | No       | Your Valorant PUUID                      |

## Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
# Check for linting issues
yarn lint

# Fix auto-fixable issues
yarn lint:fix

# Format code
yarn format

# Check formatting
yarn format:check

# Type check
yarn typecheck
```

### Running Tests

```bash
# Run unit tests
yarn test

# Run tests with UI
yarn test:ui

# Run E2E tests
yarn test:e2e
```

### Pre-commit Hooks

This project uses Husky and lint-staged to run checks before commits. The following will run automatically:

- ESLint on `.ts` and `.tsx` files
- Prettier on all supported files

## Making Changes

### Pull Request Process

1. **Create a feature branch** from `main`

   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes** and commit with clear messages

   ```bash
   git commit -m "feat: add new component for X"
   ```

3. **Ensure all checks pass**

   ```bash
   yarn validate  # Runs typecheck, lint, and format:check
   yarn test
   ```

4. **Push and create a Pull Request**

   ```bash
   git push origin feature/your-feature
   ```

5. **Fill out the PR template** with relevant details

### Commit Message Format

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add dark mode toggle to navbar
fix: resolve hydration mismatch in guestbook
docs: update README with new setup instructions
```

## Project Structure

```
portfolio/
├── components/          # React components
│   ├── metrics/         # API integration components
│   └── ui/              # Reusable UI components
├── data/                # Static data (work experience, etc.)
├── lib/                 # Utilities and API clients
├── pages/               # Next.js pages and API routes
│   └── api/             # Backend API endpoints
├── prisma/              # Database schema
├── public/              # Static assets
└── styles/              # Global styles
```

## Adding New Features

### New API Integration

1. Create the API route in `pages/api/`
2. Add types to `lib/types.ts`
3. Create a component in `components/metrics/`
4. Use SWR for data fetching

### New UI Component

1. Create the component in `components/` or `components/ui/`
2. Use TypeScript interfaces for props
3. Support both light and dark modes
4. Make it responsive (mobile-first)

## Questions?

If you have questions or need help, feel free to:

- Open an issue for bugs or feature requests
- Start a discussion for general questions

Thank you for contributing!
