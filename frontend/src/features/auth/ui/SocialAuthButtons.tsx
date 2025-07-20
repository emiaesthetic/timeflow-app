import { Button } from '@/shared/ui/Button';
import { GitHubIcon } from '@/shared/ui/icons/GitHub';
import { GoogleIcon } from '@/shared/ui/icons/Google';

export function SocialAuthButtons({
  isLoading,
  onGitHub,
  onGoogle,
}: {
  isLoading: boolean;
  onGitHub: () => void;
  onGoogle: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-x-4">
      <Button
        className="flex-1/2"
        size="sm"
        type="button"
        onClick={onGitHub}
        disabled={isLoading}
      >
        <GitHubIcon />
        GitHub
      </Button>

      <Button
        className="flex-1/2"
        size="sm"
        type="button"
        onClick={onGoogle}
        disabled={isLoading}
      >
        <GoogleIcon />
        Google
      </Button>
    </div>
  );
}
