import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 border-2 border-transparent rounded-2xl font-medium text-base whitespace-nowrap cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-[var(--border-primary)] focus-visible:outline-offset-2 transition-[background-color,color,border-color]',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:bg-[var(--background-primary)] hover:text-[var(--foreground-primary)] hover:border-[var(--border-primary)]',
        secondary:
          'bg-transparent text-[var(--foreground-primary)] hover:bg-[var(--background-secondary)] hover:text-[var(--foreground-secondary)]',
      },
      size: {
        primary: 'h-12 p-4',
        icon: 'size-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'primary',
    },
  },
);

export const Button = ({
  className,
  variant,
  size,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
