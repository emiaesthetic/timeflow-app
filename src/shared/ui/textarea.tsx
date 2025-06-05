import React from 'react';

import { cn } from '@/shared/lib/utils';

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'w-full h-32 p-4 border-1 rounded-2xl border-[var(--border-muted)] font-normal text-base resize-none',
        'bg-[var(--background-primary)] text-[var(--foreground-primary)] placeholder:text-[var(--foreground-muted)]',
        'outline-0 aria-invalid:border-[var(--border-error)] disabled:pointer-events-none disabled:opacity-50',
        'hover:border-[var(--border-primary)] focus:border-[var(--border-primary)] transition-[border-color]',
        className,
      )}
      ref={ref}
      {...props}
    ></textarea>
  );
});

TextArea.displayName = 'TextArea';
