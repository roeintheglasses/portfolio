'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { LinkPreview } from './ui/link-preview';

interface TechLink {
  text: string;
  url: string;
}

interface Company {
  id: string;
  name: string;
  role: string;
  period: string;
  website: string | null;
  logo: string;
  color: string;
  description: string;
  highlights: string[];
  summary: string | null;
  links: TechLink[];
}

interface WorkTimelineProps {
  companies: Company[];
}

function TimelineCard({
  company,
  index,
  isLast,
}: {
  company: Company;
  index: number;
  isLast: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const isCurrent = company.period.toLowerCase().includes('present');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute left-[11px] top-12 h-[calc(100%+2rem)] w-0.5 md:left-[15px]"
          style={{
            background: `linear-gradient(to bottom, ${company.color}, transparent)`,
          }}
        />
      )}

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        className="absolute left-0 top-4 flex items-center justify-center md:left-1"
      >
        <div
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 bg-gray-50 dark:bg-gray-900 md:h-7 md:w-7"
          style={{ borderColor: company.color }}
        >
          {isCurrent && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2.5 w-2.5 rounded-full md:h-3 md:w-3"
              style={{ backgroundColor: company.color }}
            />
          )}
        </div>
      </motion.div>

      {/* Card */}
      <div
        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700"
        style={{
          boxShadow: isExpanded ? `0 4px 20px -4px ${company.color}20` : 'none',
        }}
      >
        {/* Gradient accent */}
        <div
          className="absolute left-0 right-0 top-0 h-1"
          style={{ backgroundColor: company.color }}
        />

        {/* Header - Always visible */}
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full p-4 text-left md:p-6">
          <div className="flex items-start gap-4">
            {/* Company logo */}
            <div
              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 md:h-14 md:w-14"
              style={{ borderColor: company.color }}
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                className="object-cover"
              />
            </div>

            {/* Company info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {company.website ? (
                  <LinkPreview
                    url={company.website}
                    width={280}
                    height={160}
                    className="text-lg font-bold text-gray-900 hover:underline dark:text-white md:text-xl"
                  >
                    {company.name}
                  </LinkPreview>
                ) : (
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
                    {company.name}
                  </h3>
                )}
                {isCurrent && (
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: company.color }}
                  >
                    Current
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm font-medium text-gray-600 dark:text-gray-400 md:text-base">
                {company.role}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500 md:text-sm">
                {company.period}
              </p>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-0 md:px-6 md:pb-6">
                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:text-base">
                  {company.description}
                </p>

                {/* Highlights */}
                {company.highlights.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                      Key Contributions
                    </h4>
                    <ul className="space-y-2">
                      {company.highlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: company.color }}
                          />
                          <span dangerouslySetInnerHTML={{ __html: highlight }} />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Summary */}
                {company.summary && (
                  <div
                    className="mt-4 rounded-lg border-l-2 bg-gray-50 p-3 dark:bg-gray-800/50"
                    style={{ borderColor: company.color }}
                  >
                    <p
                      className="text-sm italic text-gray-600 dark:text-gray-400"
                      dangerouslySetInnerHTML={{ __html: company.summary }}
                    />
                  </div>
                )}

                {/* Tech links */}
                {company.links && company.links.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                      Technologies & Links
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {company.links.map((link, linkIdx) => (
                        <LinkPreview
                          key={linkIdx}
                          url={link.url}
                          width={250}
                          height={150}
                          className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          {link.text}
                        </LinkPreview>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function WorkTimeline({ companies }: WorkTimelineProps) {
  return (
    <div className="relative">
      {/* Section header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="mb-1 text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Career Journey
        </p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Where I&apos;ve Worked
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-8">
        {companies.map((company, index) => (
          <TimelineCard
            key={company.id}
            company={company}
            index={index}
            isLast={index === companies.length - 1}
          />
        ))}
      </div>

      {/* Timeline start indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative mt-8 pl-8 md:pl-12"
      >
        <div className="absolute left-[11px] top-0 h-4 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700 md:left-[15px]" />
        <p className="text-sm italic text-gray-400 dark:text-gray-600">
          Started my journey in 2019...
        </p>
      </motion.div>
    </div>
  );
}
