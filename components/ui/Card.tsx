import cn from 'classnames';
import { ReactNode, HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gradient?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const paddingSizes = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, gradient, hover = true, padding = 'md', ...props }, ref) => {
    if (gradient) {
      return (
        <div
          ref={ref}
          className={cn(
            'animate-gradient-xy rounded-xl bg-gradient-to-tr p-[1px]',
            gradient,
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'h-full rounded-[11px] bg-gray-50 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90',
              paddingSizes[padding],
              hover && 'transition-transform duration-200 hover:scale-[1.01]'
            )}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl bg-white/20 dark:bg-gray-800/20',
          'border border-white/30 dark:border-gray-700/30',
          'shadow-lg backdrop-blur-xl',
          paddingSizes[padding],
          hover && 'transition-all duration-200 hover:scale-[1.01] hover:shadow-xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
