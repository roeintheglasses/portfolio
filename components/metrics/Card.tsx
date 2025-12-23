import { cn } from 'lib/utils';

interface MetricCardProps {
  header: string;
  link: string;
  metric: number;
  isCurrency?: boolean;
  gradient?: string;
  isPercentage?: boolean;
  showSvg?: boolean;
  isLoading?: boolean;
}

export default function MetricCard({
  header,
  link,
  metric,
  isCurrency = false,
  gradient = 'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
  isPercentage = false,
  showSvg = true,
  isLoading = false,
}: MetricCardProps) {
  const numericMetric = Number(metric);

  return (
    <div
      className={cn(
        'metric-card w-full max-w-72 rounded-lg',
        'bg-gradient-to-tr p-1 motion-safe:animate-gradient-xy',
        gradient
      )}
    >
      <div className="flex h-full flex-col justify-between rounded-md bg-gray-50 bg-opacity-90 p-4 dark:bg-gray-900 dark:bg-opacity-90">
        <a aria-label={header} target="_blank" rel="noopener noreferrer" href={link}>
          <div className="flex items-center text-gray-900 dark:text-gray-100">
            {header}
            {showSvg && (
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            )}
          </div>
        </a>
        {isLoading ? (
          <div className="mt-2 h-9 w-24 animate-pulse rounded bg-gray-200 motion-reduce:animate-none dark:bg-gray-700" />
        ) : (
          <p className="spacing-sm mt-2 text-3xl font-bold text-black dark:text-white">
            {numericMetric > 0 && isCurrency && '$'}
            {numericMetric > 0 ? numericMetric.toLocaleString() : '-'}
            {numericMetric > 0 && isPercentage && '%'}
          </p>
        )}
      </div>
    </div>
  );
}
