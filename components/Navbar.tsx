import MobileMenu from 'components/MobileMenu';
import CommandPalette from 'components/CommandPalette';
import ThemeChange from './ThemeChange';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from 'lib/utils';
import IconChip from './IconChip';

import { IconBrandGithub } from '@tabler/icons-react';
const githubLink = '//github.com/roeintheglasses';

interface NavItemProps {
  href: string;
  text: string;
}

function NavItem({ href, text }: NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'hidden rounded-lg p-1 sm:px-3 sm:py-2 md:inline-block',
        'hover:bg-gray-200 dark:hover:bg-gray-800',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
        'transition-all'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="capsize">{text}</span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="relative mx-auto flex w-full max-w-5xl items-center justify-between border-gray-200 pb-8 pt-8 text-gray-900 dark:border-gray-700 dark:text-gray-100 sm:pb-16">
      <div className="ml-[-0.60rem]">
        <MobileMenu />
        <NavItem href="/" text="Home" />
        <NavItem href="/work" text="Work" />
        <NavItem href="/about" text="About" />
        <NavItem href="/projects" text="Projects" />
        <NavItem href="/stories" text="Stories" />
        <NavItem href="/guestbook" text="Guestbook" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <CommandPalette />
        <IconChip Icon={IconBrandGithub} link={githubLink} />
        <ThemeChange />
      </div>
    </nav>
  );
}
