import { cn } from '@/shared/lib/utils';

import { ChevronIcon } from './icons';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: React.ReactNode;
}

export const Select = ({ className, options, ...props }: SelectProps) => {
  return (
    <div className="relative w-max">
      <select
        className={cn(
          'border-input bg-secondary text-secondary-foreground placeholder:text-muted-foreground aria-invalid:border-destructive hover:bg-muted focus-visible:bg-muted h-12 w-full appearance-none rounded-2xl border-1 py-2 pr-8 pl-4 text-base font-normal outline-0 transition-colors disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {options}
      </select>
      <ChevronIcon className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 -rotate-90" />
    </div>
  );
};
