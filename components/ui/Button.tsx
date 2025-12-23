import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from 'lib/utils';
import { ReactNode, forwardRef } from 'react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variants = {
  primary:
    'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200',
  secondary:
    'border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200',
  ghost: 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400',
  destructive: 'bg-red-500 hover:bg-red-600 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-8 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      isLoading,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          'dark:focus-visible:ring-offset-gray-900',
          'transition-colors duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-label="Loading"
          />
        ) : (
          leftIcon
        )}
        {children}
        {rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
