import React from 'react';

import { cn } from '@/shared/lib/utils';

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'border-input bg-secondary text-secondary-foreground placeholder:text-muted-foreground aria-invalid:border-destructive hover:bg-muted focus-visible:bg-muted h-32 w-full resize-none rounded-2xl border-1 p-4 text-base font-normal outline-0 transition-colors disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    ></textarea>
  );
});

TextArea.displayName = 'TextArea';
