'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function AboutSection({
  title,
  subtitle,
  children,
  className = '',
}: AboutSectionProps) {
  return (
    <section className={`mt-16 md:mt-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl lg:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-base text-gray-600 dark:text-gray-400 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Section Content */}
        {children}
      </motion.div>
    </section>
  );
}
