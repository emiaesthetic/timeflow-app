import { LogoIcon } from './icons';

export const Logo = () => {
  return (
    <a
      className="inline-flex items-center gap-x-1 min-h-12 py-2 px-4 border-2 border-solid border-[var(--border-primary)] rounded-2xl font-normal uppercase bg-[var(--background-primary)] text-[var(--foreground-primary)] focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-[var(--border-primary)] focus-visible:outline-offset-2"
      href="/"
    >
      <LogoIcon className="size-6" />
      TimeFlow
    </a>
  );
};
