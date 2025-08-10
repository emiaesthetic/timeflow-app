import { cn } from '@/shared/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 hover:bg-background/20 focus-visible:bg-background/20 flex field-sizing-content min-h-30 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[background-color,color,box-shadow] outline-none hover:shadow-lg focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
