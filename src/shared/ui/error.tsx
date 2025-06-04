import { cn } from '@/shared/lib/utils';

interface IErrorProps {
  variant?: 'bottom-left' | 'top-right';
  className?: string;
  message?: string;
}

export const Error = ({
  variant = 'bottom-left',
  className,
  message,
}: IErrorProps) => {
  return (
    <p
      className={cn(
        'absolute font-normal text-sm text-[var(--foreground-error)]',
        variant === 'bottom-left' && 'top-full left-1',
        variant === 'top-right' && 'top-1 right-1',
        className,
      )}
      data-error={!!message}
    >
      {message}
    </p>
  );
};
