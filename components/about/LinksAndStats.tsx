'use client';

import useSWR from 'swr';
import { motion } from 'motion/react';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorld,
  IconExternalLink,
  IconEye,
  IconUsers,
} from '@tabler/icons-react';
import { Button } from 'components/ui/Button';
import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import { SWR_CONFIG } from '@/lib/constants';

interface SocialLink {
  label: string;
  text: string;
  href: string;
}

interface LinksAndStatsProps {
  links: SocialLink[];
  className?: string;
}

function getIcon(label: string) {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('github')) {
    return <IconBrandGithub className="h-4 w-4" />;
  }
  if (lowerLabel.includes('linkedin')) {
    return <IconBrandLinkedin className="h-4 w-4" />;
  }
  return <IconWorld className="h-4 w-4" />;
}

function StatChip({
  icon,
  value,
  label,
  isLoading,
  index,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  isLoading?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium dark:bg-zinc-800"
    >
      {icon}
      {isLoading ? (
        <span className="h-4 w-10 animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
      ) : (
        <span className="font-semibold text-gray-900 dark:text-white">
          {value.toLocaleString()}
        </span>
      )}
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
    </motion.div>
  );
}

function Separator() {
  return (
    <div className="hidden h-6 w-px bg-zinc-300 dark:bg-zinc-700 sm:block" aria-hidden="true" />
  );
}

export default function LinksAndStats({ links, className = '' }: LinksAndStatsProps) {
  const { data, isLoading } = useSWR<Views>('/api/views', fetcher, SWR_CONFIG);

  const pageViews = data?.total ?? 0;
  const uniqueVisitors = data?.visitors ?? 0;

  const totalItems = links.length + 2; // links + 2 stat chips

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={className}
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Social Links */}
        {links.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <Button
              variant="secondary"
              size="sm"
              leftIcon={getIcon(link.label)}
              rightIcon={
                link.href.startsWith('http') ? (
                  <IconExternalLink className="h-3 w-3 opacity-50" />
                ) : undefined
              }
            >
              {link.text}
            </Button>
          </motion.a>
        ))}

        {/* Separator */}
        <Separator />

        {/* Stat Chips */}
        <StatChip
          icon={<IconEye className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          value={pageViews}
          label="Views"
          isLoading={isLoading}
          index={links.length}
        />
        <StatChip
          icon={<IconUsers className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          value={uniqueVisitors}
          label="Visitors"
          isLoading={isLoading}
          index={links.length + 1}
        />
      </div>
    </motion.div>
  );
}
