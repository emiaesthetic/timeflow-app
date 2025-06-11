import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'focus-visible-outline inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-transparent text-base font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'text-secondary-foreground hover:bg-primary/90 hover:text-primary-foreground bg-transparent',
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
