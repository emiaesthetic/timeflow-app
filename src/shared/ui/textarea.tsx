import React from 'react';

import { cn } from '@/shared/lib/utils';

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'h-32 w-full resize-none rounded-2xl border-1 border-[var(--border-muted)] p-4 text-base font-normal',
        'bg-[var(--background-primary)] text-[var(--foreground-primary)] placeholder:text-[var(--foreground-muted)]',
        'outline-0 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[var(--border-error)]',
        'transition-[border-color] hover:border-[var(--border-primary)] focus:border-[var(--border-primary)]',
        className,
      )}
      ref={ref}
      {...props}
    ></textarea>
  );
});

TextArea.displayName = 'TextArea';
