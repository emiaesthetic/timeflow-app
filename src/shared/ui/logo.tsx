import { LogoIcon } from './icons';

export const Logo = () => {
  return (
    <a
      className="inline-flex min-h-12 items-center gap-x-1 rounded-2xl border-2 border-solid border-[var(--border-primary)] bg-[var(--background-primary)] px-4 py-2 font-normal text-[var(--foreground-primary)] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-primary)] focus-visible:outline-dashed"
      href="/"
    >
      <LogoIcon className="size-6" />
      TimeFlow
    </a>
  );
};
