'use client';

import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconFolder,
  IconCamera,
  IconBook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconSun,
  IconMoon,
  IconCopy,
  IconExternalLink,
  IconCommand,
  IconSearch,
} from '@tabler/icons-react';
import { siteConfig } from '@/config/site';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string[];
  action: () => void;
  keywords?: string[];
}

interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

export default function CommandPalette() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Toggle command palette
  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  // Copy email to clipboard
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Navigate and close
  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  // Open external link
  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setOpen(false);
  }, [theme, setTheme]);

  const commandGroups: CommandGroup[] = [
    {
      heading: 'Navigation',
      items: [
        {
          id: 'home',
          label: 'Home',
          icon: <IconHome className="h-4 w-4" />,
          action: () => navigate('/'),
          keywords: ['home', 'start', 'main'],
        },
        {
          id: 'about',
          label: 'About',
          icon: <IconUser className="h-4 w-4" />,
          action: () => navigate('/about'),
          keywords: ['about', 'me', 'bio', 'info'],
        },
        {
          id: 'work',
          label: 'Work',
          icon: <IconBriefcase className="h-4 w-4" />,
          action: () => navigate('/work'),
          keywords: ['work', 'experience', 'career', 'job'],
        },
        {
          id: 'projects',
          label: 'Projects',
          icon: <IconFolder className="h-4 w-4" />,
          action: () => navigate('/projects'),
          keywords: ['projects', 'portfolio', 'code'],
        },
        {
          id: 'stories',
          label: 'Stories',
          icon: <IconCamera className="h-4 w-4" />,
          action: () => navigate('/stories'),
          keywords: ['stories', 'photos', 'photography', 'journal'],
        },
        {
          id: 'guestbook',
          label: 'Guestbook',
          icon: <IconBook className="h-4 w-4" />,
          action: () => navigate('/guestbook'),
          keywords: ['guestbook', 'sign', 'message', 'comment'],
        },
      ],
    },
    {
      heading: 'Actions',
      items: [
        {
          id: 'theme',
          label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
          icon:
            theme === 'dark' ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />,
          shortcut: ['T'],
          action: toggleTheme,
          keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
        },
        {
          id: 'copy-email',
          label: copied ? 'Email Copied!' : 'Copy Email',
          icon: <IconCopy className="h-4 w-4" />,
          shortcut: ['E'],
          action: copyEmail,
          keywords: ['email', 'copy', 'contact', 'mail'],
        },
      ],
    },
    {
      heading: 'Social',
      items: [
        {
          id: 'github',
          label: 'GitHub',
          icon: <IconBrandGithub className="h-4 w-4" />,
          shortcut: ['G'],
          action: () => openExternal(siteConfig.social.github),
          keywords: ['github', 'code', 'repo', 'git'],
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          icon: <IconBrandLinkedin className="h-4 w-4" />,
          shortcut: ['L'],
          action: () => openExternal(siteConfig.social.linkedin),
          keywords: ['linkedin', 'professional', 'network', 'job'],
        },
        {
          id: 'email',
          label: 'Send Email',
          icon: <IconMail className="h-4 w-4" />,
          action: () => openExternal(`mailto:${siteConfig.email}`),
          keywords: ['email', 'mail', 'contact', 'message'],
        },
      ],
    },
  ];

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        className="relative z-20 ml-2 mr-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-zinc-300 transition-colors duration-200 ease-in-out hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-800"
        type="button"
        aria-label="Open command palette (⌘K)"
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1, ease: 'easeIn' }}
        onClick={toggle}
      >
        <IconCommand className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
      </motion.button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Command Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center px-4 pt-[20vh]"
            >
              <Command
                className="pointer-events-auto w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                loop
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800">
                  <IconSearch className="h-5 w-5 shrink-0 text-zinc-400" />
                  <Command.Input
                    placeholder="Type a command or search..."
                    className="h-14 w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100"
                    autoFocus
                  />
                  <kbd className="hidden shrink-0 rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 sm:inline-block">
                    ESC
                  </kbd>
                </div>

                {/* Command List */}
                <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-zinc-500">
                    No results found.
                  </Command.Empty>

                  {commandGroups.map((group) => (
                    <Command.Group
                      key={group.heading}
                      heading={group.heading}
                      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-zinc-400 [&_[cmdk-group-heading]]:dark:text-zinc-500"
                    >
                      {group.items.map((item) => (
                        <Command.Item
                          key={item.id}
                          value={`${item.label} ${item.keywords?.join(' ') || ''}`}
                          onSelect={item.action}
                          className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition-colors aria-selected:bg-zinc-100 dark:text-zinc-300 dark:aria-selected:bg-zinc-800"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors group-aria-selected:bg-zinc-200 group-aria-selected:text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-aria-selected:bg-zinc-700 dark:group-aria-selected:text-zinc-200">
                            {item.icon}
                          </span>
                          <span className="flex-1 font-medium">{item.label}</span>
                          {item.shortcut && (
                            <div className="flex gap-1">
                              {item.shortcut.map((key) => (
                                <kbd
                                  key={key}
                                  className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                                >
                                  {key}
                                </kbd>
                              ))}
                            </div>
                          )}
                          {item.id === 'github' || item.id === 'linkedin' || item.id === 'email' ? (
                            <IconExternalLink className="h-3 w-3 text-zinc-400" />
                          ) : null}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-2 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 font-medium dark:bg-zinc-800">
                      ↑↓
                    </kbd>
                    <span>Navigate</span>
                    <kbd className="ml-2 rounded bg-zinc-100 px-1.5 py-0.5 font-medium dark:bg-zinc-800">
                      ↵
                    </kbd>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 font-medium dark:bg-zinc-800">
                      ⌘
                    </kbd>
                    <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 font-medium dark:bg-zinc-800">
                      K
                    </kbd>
                    <span className="ml-1">to toggle</span>
                  </div>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
