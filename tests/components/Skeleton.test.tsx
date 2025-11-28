import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Skeleton,
  CardSkeleton,
  TrackSkeleton,
  StatCardSkeleton,
  GuestbookEntrySkeleton,
} from 'components/ui/Skeleton';

describe('Skeleton', () => {
  it('renders with default rectangular variant', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('rounded-md');
  });

  it('renders text variant', () => {
    render(<Skeleton variant="text" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded');
  });

  it('renders circular variant', () => {
    render(<Skeleton variant="circular" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
  });

  it('applies custom width and height', () => {
    render(<Skeleton width={100} height={50} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({ width: '100px', height: '50px' });
  });

  it('renders multiple lines for text variant', () => {
    render(<Skeleton variant="text" lines={3} data-testid="skeleton-container" />);
    const container = screen.getByTestId('skeleton-container');
    expect(container.children).toHaveLength(3);
  });

  it('has reduced motion support class', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('motion-reduce:animate-none');
  });
});

describe('Skeleton Presets', () => {
  it('renders CardSkeleton', () => {
    render(<CardSkeleton />);
    // CardSkeleton contains multiple skeleton elements
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders TrackSkeleton', () => {
    render(<TrackSkeleton />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders StatCardSkeleton', () => {
    render(<StatCardSkeleton />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders GuestbookEntrySkeleton', () => {
    render(<GuestbookEntrySkeleton />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
