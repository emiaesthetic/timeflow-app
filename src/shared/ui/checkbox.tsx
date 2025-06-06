import { cn } from '@/shared/lib/utils';

export const Checkbox = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <input
        className={cn(
          'checkbox size-8 border-2 border-solid border-[var(--border-primary)] rounded-lg bg-transparent appearance-none [&:checked]:bg-[var(--background-secondary)]  outline-0 focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-[var(--border-primary)] focus-visible:outline-offset-2 peer',
          className,
        )}
        type="checkbox"
        {...props}
      />
    </>
  );
};
