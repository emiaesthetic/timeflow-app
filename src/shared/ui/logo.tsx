import { LogoIcon } from './icons';

export const Logo = () => {
  return (
    <a
      className="text-secondary-foreground bg-secondary focus-visible-outline inline-flex min-h-12 items-center gap-x-1 rounded-2xl border-1 border-solid px-4 py-2 font-normal uppercase"
      href="/"
    >
      <LogoIcon className="size-6" />
      TimeFlow
    </a>
  );
};
