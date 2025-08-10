import { Button } from '@/shared/ui/Button';
import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { Link } from '@/shared/ui/Link';

import { useAuth } from '../model/useAuth';

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button className="size-10 rounded-md p-0">
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
              onClick={logout}
            >
              Logout
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
