import { AuthButton } from '@/features/auth';

export function Header() {
  return (
    <header className="py-4">
      <div className="mx-auto max-w-300 px-4">
        <div className="border-muted flex items-center justify-end gap-x-8 border-b-1 border-solid pb-4">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
