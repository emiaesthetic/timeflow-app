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
        'w-full h-12 px-4 py-2 border-2 rounded-2xl border-[var(--border-muted)] font-normal text-base',
        'bg-[var(--background-primary)] text-[var(--foreground-primary)] placeholder:text-[var(--foreground-muted)]',
        'outline-0 aria-invalid:border-[var(--border-error)] disabled:pointer-events-none disabled:opacity-50',
        'hover:border-[var(--border-primary)] focus:border-[var(--border-primary)] transition-[border-color]',
        className,
      )}
      type={type}
      {...props}
    />
  );
});

Input.displayName = 'Input';
