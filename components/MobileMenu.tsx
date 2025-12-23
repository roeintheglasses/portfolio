import { useEffect, useState, useCallback, useRef } from 'react';

import Link from 'next/link';
import { cn } from 'lib/utils';
import styles from 'styles/mobile-menu.module.css';
import useDelayedRender from 'use-delayed-render';
import { navigation } from '../data/nav';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(isMenuOpen, {
    enterDelay: 20,
    exitDelay: 300,
  });

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
    buttonRef.current?.focus();
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }, [isMenuOpen, closeMenu]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Focus first menu item when opened
  useEffect(() => {
    if (isMenuRendered && menuRef.current) {
      const firstLink = menuRef.current.querySelector('a');
      firstLink?.focus();
    }
  }, [isMenuRendered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        className={cn(
          styles.burger,
          'visible z-20 md:hidden',
          'rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'
        )}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} aria-hidden="true" />
        <CrossIcon data-hide={!isMenuOpen} aria-hidden="true" />
      </button>
      {isMenuMounted && (
        <nav id="mobile-menu" role="navigation" aria-label="Mobile navigation">
          <ul
            ref={menuRef}
            className={cn(
              styles.menu,
              'fixed flex flex-col bg-gray-100 dark:bg-gray-900',
              isMenuRendered && styles.menuRendered
            )}
          >
            {navigation?.pages.map((page, index) => (
              <li
                key={index}
                className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100"
                style={{ transitionDelay: `${150 + index * 50}ms` }}
              >
                <Link
                  href={page.href}
                  className="flex w-auto pb-4 transition-colors focus:outline-none focus-visible:text-blue-500 dark:focus-visible:text-blue-400"
                  onClick={closeMenu}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="absolute h-5 w-5 text-gray-900 dark:text-gray-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="absolute h-5 w-5 text-gray-900 dark:text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
