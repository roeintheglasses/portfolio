'use client';

import { cn } from 'lib/utils';
import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  ...props
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 motion-reduce:animate-none';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? (variant === 'text' ? '1em' : undefined),
  };

  if (lines > 1 && variant === 'text') {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClasses, variantClasses.text)}
            style={{
              ...style,
              width: i === lines - 1 ? '80%' : style.width,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} style={style} {...props} />
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <Skeleton variant="rectangular" height={160} className="mb-4" />
      <Skeleton variant="text" height={24} className="mb-2" width="60%" />
      <Skeleton variant="text" lines={2} height={16} />
    </div>
  );
}

function TrackSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-lg p-3">
      <Skeleton variant="text" width={24} height={24} />
      <Skeleton variant="rectangular" width={48} height={48} />
      <div className="flex-1">
        <Skeleton variant="text" height={18} width="70%" className="mb-1" />
        <Skeleton variant="text" height={14} width="50%" />
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <Skeleton variant="text" height={14} width="40%" className="mb-2" />
      <Skeleton variant="text" height={32} width="60%" />
    </div>
  );
}

function GuestbookEntrySkeleton() {
  return (
    <div className="border-b border-gray-200 p-4 dark:border-gray-700">
      <div className="mb-2 flex items-center gap-3">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" height={16} width={120} />
      </div>
      <Skeleton variant="text" lines={2} height={16} />
    </div>
  );
}

export { Skeleton, CardSkeleton, TrackSkeleton, StatCardSkeleton, GuestbookEntrySkeleton };
