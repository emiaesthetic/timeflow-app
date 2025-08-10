import { AUTH } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Separator } from '@/shared/ui/Separator';
import { GitHubIcon } from '@/shared/ui/icons/GitHub';
import { GoogleIcon } from '@/shared/ui/icons/Google';

function OAuthProviders({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="flex basis-full flex-col gap-y-6">
      <div className="flex items-center gap-x-2">
        <Separator className="flex-1/2" />
        <span className="text-sm text-nowrap">or continue with</span>
        <Separator className="flex-1/2" />
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <Button
          className="flex-1/2"
          size="sm"
          type="button"
          onClick={() => {
            window.location.href = AUTH.getGithubRedirectUrl();
          }}
          disabled={isLoading}
        >
          <GitHubIcon />
          GitHub
        </Button>

        <Button
          className="flex-1/2"
          size="sm"
          type="button"
          onClick={() => {
            window.location.href = AUTH.getGoogleRedirectUrl();
          }}
          disabled={isLoading}
        >
          <GoogleIcon />
          Google
        </Button>
      </div>
    </div>
  );
}

export { OAuthProviders };
