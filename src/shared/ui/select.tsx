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
          'w-full h-12 pl-4 pr-8 py-2 border-1 rounded-2xl border-[var(--border-muted)] font-normal text-base appearance-none',
          'bg-[var(--background-primary)] text-[var(--foreground-primary)] placeholder:text-[var(--foreground-muted)]',
          'outline-0 aria-invalid:border-[var(--border-error)] disabled:pointer-events-none disabled:opacity-50',
          'hover:border-[var(--border-primary)] focus:border-[var(--border-primary)] transition-[border-color]',
          className,
        )}
        {...props}
      >
        {options}
      </select>
      <ChevronIcon className="absolute top-1/2 right-2.5 -translate-y-1/2 size-3.5 -rotate-90 pointer-events-none" />
    </div>
  );
};
