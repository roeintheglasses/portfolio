import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MetricCard from 'components/metrics/Card';

describe('MetricCard', () => {
  const defaultProps = {
    header: 'Test Metric',
    link: 'https://example.com',
    metric: 1234,
  };

  it('renders header and metric value', () => {
    render(<MetricCard {...defaultProps} />);
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders link with correct attributes', () => {
    render(<MetricCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: 'Test Metric' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows dash when metric is 0', () => {
    render(<MetricCard {...defaultProps} metric={0} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('formats currency when isCurrency is true', () => {
    render(<MetricCard {...defaultProps} isCurrency />);
    expect(screen.getByText('$1,234')).toBeInTheDocument();
  });

  it('formats percentage when isPercentage is true', () => {
    render(<MetricCard {...defaultProps} metric={75} isPercentage />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('hides SVG icon when showSvg is false', () => {
    const { container } = render(<MetricCard {...defaultProps} showSvg={false} />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<MetricCard {...defaultProps} isLoading />);
    expect(screen.queryByText('1,234')).not.toBeInTheDocument();
    const loadingIndicator = document.querySelector('.animate-pulse');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('applies custom gradient', () => {
    const { container } = render(
      <MetricCard {...defaultProps} gradient="from-red-500 to-blue-500" />
    );
    const gradientDiv = container.querySelector('.from-red-500.to-blue-500');
    expect(gradientDiv).toBeInTheDocument();
  });

  it('respects reduced motion preference', () => {
    const { container } = render(<MetricCard {...defaultProps} />);
    const animatedElement = container.querySelector('.motion-safe\\:animate-gradient-xy');
    expect(animatedElement).toBeInTheDocument();
  });
});
