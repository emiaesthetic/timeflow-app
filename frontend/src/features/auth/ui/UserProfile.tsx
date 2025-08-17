import { Button } from '@/shared/ui/Button';
import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { Link } from '@/shared/ui/Link';

import { useLogoutMutation } from '../model/useLogoutMutation';
import { useUserQuery } from '../model/useUserQuery';

export function UserProfile() {
  const { user } = useUserQuery();
  const { isPending, mutate: logout } = useLogoutMutation();

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
            src={user.picture}
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
              to="/profile"
            >
              Profile
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link
              className="bg-transparent hover:bg-transparent"
              variant="ghost"
              size="sm"
              to="/settings"
            >
              Settings
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Button
              className="bg-transparent hover:bg-transparent"
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              disabled={isPending}
            >
              Logout
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
