import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';
import useSound from 'use-sound';

const ThemeChange = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  const [ThemeSound] = useSound('/static/sounds/switch-on.mp3');

  const ThemeChange = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div className="relative z-20 ml-1 cursor-pointer rounded-xl bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800">
      <motion.button
        className="flex h-10 w-10 items-center justify-center p-2"
        whileTap={{
          scale: 0.7,
          rotate: 360
        }}
        whileHover={mounted ? { scale: 1.1 } : {}}
        transition={{ duration: 0.2, ease: 'easeIn' }}
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => {
          ThemeChange();
          ThemeSound();
        }}
      >
        {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
          <HiSun className="h-5 w-5 hover:animate-spin" />
        ) : (
          <HiMoon className="h-5 w-5 hover:animate-spin" />
        )}
      </motion.button>
    </div>
  );
};

export default ThemeChange;
