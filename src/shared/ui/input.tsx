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
        'border-input bg-secondary text-secondary-foreground placeholder:text-muted-foreground aria-invalid:border-destructive hover:bg-muted focus-visible:bg-muted h-12 w-full rounded-2xl border-1 px-4 py-2 text-base font-normal outline-0 transition-colors disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      type={type}
      {...props}
    />
  );
});

Input.displayName = 'Input';
