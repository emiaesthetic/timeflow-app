import { cn } from '@/shared/lib/utils';

export const Label = ({
  className,
  htmlFor,
  children,
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={cn('block font-medium mb-1 pl-1', className)}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
