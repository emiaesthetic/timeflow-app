import { cn } from '@/shared/lib/utils';

export const Label = ({
  className,
  htmlFor,
  children,
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={cn('mb-1 block pl-1 font-medium', className)}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
