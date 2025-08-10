import { cn } from '../lib/utils';

function MorphingBorder({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'morphing-border relative flex aspect-square w-full items-center justify-center rounded-full bg-transparent',
        className,
      )}
    >
      {children}
      {/* <span className="blob__text animate-text-gradient bg-gradient-to-r from-pink-500 via-violet-500 to-sky-300 bg-[length:200%] bg-clip-text text-[clamp(1.875rem,-0.2679rem+4.4643vw,2.5rem)] font-semibold text-transparent">
        Timeflow.
      </span> */}
    </div>
  );
}

export { MorphingBorder };
