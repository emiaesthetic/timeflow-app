import React from 'react';

import { cn } from '@/shared/lib/utils';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'h-12 w-full rounded-2xl border-1 border-[var(--border-muted)] px-4 py-2 text-base font-normal',
        'bg-[var(--background-primary)] text-[var(--foreground-primary)] placeholder:text-[var(--foreground-muted)]',
        'outline-0 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[var(--border-error)]',
        'transition-[border-color] hover:border-[var(--border-primary)] focus:border-[var(--border-primary)]',
        className,
      )}
      type={type}
      {...props}
    />
  );
});

Input.displayName = 'Input';
