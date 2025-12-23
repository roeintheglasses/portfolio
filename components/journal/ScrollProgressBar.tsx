'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useStoriesStore } from '@/store/storiesStore';

export default function ScrollProgressBar() {
  const { scrollProgress, setScrollProgress } = useStoriesStore();

  useEffect(() => {
    // Reset scroll progress on mount (in case of stale state from previous page)
    setScrollProgress(0);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Small delay to ensure page height is calculated correctly after hydration
    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [setScrollProgress]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-gray-200/50 dark:bg-gray-700/50">
      <motion.div
        className="h-full bg-indigo-500"
        style={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
