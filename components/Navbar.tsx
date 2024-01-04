import MobileMenu from 'components/MobileMenu';
import CommandPalette from 'components/Commands';
import ThemeChange from './ThemeChange';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { navigation } from 'data/nav';
import IconChip from './IconChip';

import { IconBrandGithub } from '@tabler/icons-react';
const githubLink = '//github.com/roeintheglasses';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full max-w-5xl relative border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 dark:text-gray-100">
      <div className="ml-[-0.60rem]">
        <MobileMenu />
        <NavItem href="/" text="Home" />
        <NavItem href="/work" text="Work" />
        <NavItem href="/about" text="About" />
        <NavItem href="/projects" text="Projects" />
        <NavItem href="/blog" text="Blog" />
        <NavItem href="/guestbook" text="Guestbook" />
        <NavItem href="/snippets" text="Snippets" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <CommandPalette navigation={navigation} />
        <IconChip Icon={IconBrandGithub} link={githubLink} />
        <ThemeChange />
      </div>
    </nav>
  );
}
