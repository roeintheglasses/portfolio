'use client';

import { motion } from 'motion/react';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorld,
  IconExternalLink,
} from '@tabler/icons-react';
import { Button } from 'components/ui/Button';

interface SocialLink {
  label: string;
  text: string;
  href: string;
}

interface SocialLinksProps {
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

export default function SocialLinks({ links, className = '' }: SocialLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={className}
    >
      <div className="flex flex-wrap items-center gap-3">
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
      </div>
    </motion.div>
  );
}
