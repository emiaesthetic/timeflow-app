import { cn } from '@/shared/lib/utils';

export const Checkbox = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <input
        className={cn(
          'checkbox focus-visible-outline border-border [&:checked]:bg-primary size-8 appearance-none rounded-lg border-2 border-solid bg-transparent',
          className,
        )}
        type="checkbox"
        {...props}
      />
    </>
  );
};
