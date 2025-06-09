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
          'h-12 w-full appearance-none rounded-2xl border-1 border-[var(--border-muted)] py-2 pr-8 pl-4 text-base font-normal',
          'bg-[var(--background-primary)] text-[var(--foreground-primary)] placeholder:text-[var(--foreground-muted)]',
          'outline-0 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[var(--border-error)]',
          'transition-[border-color] hover:border-[var(--border-primary)] focus:border-[var(--border-primary)]',
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
