import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/Button';
import { buttonVariants } from '@/shared/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/DropdownMenu';

import { useAuth } from '../model/useAuth';

export function UserProfile() {
  const { user, logoutAccount } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-10 rounded-md p-0">
          <img
            className="h-full w-full rounded-md object-cover"
            src={user.picture}
            alt="Profile avatar"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              to="/profile"
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              to="/settings"
            >
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button variant="ghost" size="sm" onClick={logoutAccount}>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
