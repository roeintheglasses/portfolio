import { useEffect, useState } from 'react';

import Footer from 'components/Footer';
import Head from 'next/head';
import MobileMenu from 'components/MobileMenu';
import CommandPalette from 'components/Commands';
import ThemeChange from './ThemeChange';
import NextLink from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { navigation } from 'data/nav';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function Container(props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Hrishikesh Jangir - Developer, writer, designer.',
    description: `Front-end developer, JavaScript enthusiast, and an avid valorant player.`,
    image: 'https://roeintheglasses.tech/static/images/roe-banner.png',
    type: 'website',
    ...customMeta
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://roeintheglasses.tech${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://roeintheglasses.tech${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Hrishikesh Jangir" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div className="flex flex-col justify-center px-6">
        <nav className="flex items-center justify-between w-full relative max-w-5xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <div className="ml-[-0.60rem]">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/work" text="Work" />
            <NavItem href="/dashboard" text="About" />
            <NavItem href="/blog" text="Blog" />
            <NavItem href="/guestbook" text="Guestbook" />
            <NavItem href="/snippets" text="Snippets" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <CommandPalette navigation={navigation} />
            <ThemeChange />
          </div>
        </nav>
      </div>
      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="flex flex-col justify-center items-start max-w-5xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
