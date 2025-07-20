import { Button } from '@/shared/ui/Button';
import { GitHubIcon } from '@/shared/ui/icons/GitHub';
import { GoogleIcon } from '@/shared/ui/icons/Google';

export function SocialAuthButtons({
  onGitHub,
  onGoogle,
}: {
  onGitHub: () => void;
  onGoogle: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-x-4">
      <Button className="flex-1/2" size="sm" type="button" onClick={onGitHub}>
        <GitHubIcon />
        GitHub
      </Button>

      <Button className="flex-1/2" size="sm" type="button" onClick={onGoogle}>
        <GoogleIcon />
        Google
      </Button>
    </div>
  );
}
