import { LogoIcon } from '@/shared/ui/icons';

export const Preloader = () => {
  return (
    <div className="bg-background text-foreground fixed inset-0 inline-flex flex-col items-center justify-center">
      <p className="mb-4 text-xl">Authorization...</p>
      <LogoIcon className="animate-loading" />
    </div>
  );
};
