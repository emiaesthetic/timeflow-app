import { cn } from '@/shared/lib/utils';

export const Checkbox = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <input
        className={cn(
          'checkbox size-8 appearance-none rounded-lg border-2 border-solid border-[var(--border-primary)] bg-transparent outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-primary)] focus-visible:outline-dashed [&:checked]:bg-[var(--background-secondary)]',
          className,
        )}
        type="checkbox"
        {...props}
      />
    </>
  );
};
