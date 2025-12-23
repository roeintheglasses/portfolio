'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconPhoto } from '@tabler/icons-react';
import { useStoriesStore } from '@/store/storiesStore';
import type { WalkPhoto } from '@/lib/types';

interface PhotoCounterProps {
  photos: WalkPhoto[];
}

export default function PhotoCounter({ photos }: PhotoCounterProps) {
  const { activePhotoIndex, setActivePhotoIndex } = useStoriesStore();
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const totalPhotos = photos.length;

  useEffect(() => {
    // Reset active photo index on mount
    setActivePhotoIndex(0);

    // Set up intersection observer for all photos
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-photo-index') || '0', 10);
            setActivePhotoIndex(index);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    // Use requestAnimationFrame to ensure DOM is painted before querying
    const rafId = requestAnimationFrame(() => {
      const photoElements = document.querySelectorAll('[data-photo-index]');
      photoElements.forEach((el) => observerRef.current?.observe(el));
    });

    // Show counter when scrolled past hero
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollY > heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [photos, setActivePhotoIndex]);

  if (totalPhotos === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-[60px] z-30 md:right-6"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-800/80">
            <IconPhoto className="h-4 w-4 text-indigo-500" />
            <div className="flex items-baseline gap-1">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={activePhotoIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm font-semibold text-gray-900 dark:text-white"
                >
                  {activePhotoIndex + 1}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm text-gray-500 dark:text-gray-400">/ {totalPhotos}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
