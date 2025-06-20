import { Button } from '@/shared/ui/Button';
import { PlusIcon } from '@/shared/ui/icons';

export const Header = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <header className="mb-8 flex items-center justify-between gap-x-8">
      <h2 className="text-4xl font-bold">Task List</h2>
      <Button onClick={onOpen}>
        <PlusIcon className="size-6" aria-hidden="true" />
        Add new task
      </Button>
    </header>
  );
};
