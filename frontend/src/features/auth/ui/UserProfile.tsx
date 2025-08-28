import { useUserQuery } from '@/entities/user';

import { CONFIG } from '@/shared/config';
import { useSkeleton } from '@/shared/lib/useSkeleton';
import { Button } from '@/shared/ui/Button';
import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { Link } from '@/shared/ui/Link';

import { authStore } from '../model/authStore';
import { useLogoutMutation } from '../model/useLogoutMutation';

function UserProfileSkeleton() {
  return (
    <div
      className="bg-primary/30 size-10 animate-pulse rounded-md p-0"
      aria-label="Loading user profile"
    ></div>
  );
}

export function UserProfile() {
  const { isAuthenticated } = authStore();
  const { user, isPending: isUserPending } = useUserQuery({
    enabled: isAuthenticated,
  });
  const { isPending: isLogoutPending, mutate: logout } = useLogoutMutation();
  const { isShowSkeleton } = useSkeleton({ isPending: isUserPending });

  if (isShowSkeleton) return <UserProfileSkeleton />;

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10 size-10 rounded-md p-0"
        >
          <img
            className="h-full w-full rounded-md object-cover"
            src={
              user.provider === 'EMAIL_PASSWORD'
                ? `${CONFIG.SERVER_URL}${user.picture}`
                : user.picture
            }
            alt="Profile avatar"
          />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Link
              className="bg-transparent hover:bg-transparent"
              variant="ghost"
              size="sm"
              to={`/profile/${user.id}`}
            >
              Profile
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Button
              className="bg-transparent hover:bg-transparent"
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              disabled={isLogoutPending}
            >
              Logout
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
