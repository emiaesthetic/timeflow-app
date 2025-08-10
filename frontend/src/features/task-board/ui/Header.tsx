import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/ui/Button';

export function Header({
  isEmpty,
  onOpenCreator,
}: {
  isEmpty: boolean;
  onOpenCreator: () => void;
}) {
  return (
    <header className="mb-8 flex items-start justify-between gap-x-8">
      <h2 className="text-3xl font-bold">
        {isEmpty ? "You don't have any tasks yet." : 'Task List'}
      </h2>

      <Button
        className="size-10 sm:size-auto"
        onClick={onOpenCreator}
        aria-label="Add new task"
      >
        <PlusIcon className="size-6" aria-hidden="true" />
        <span className="hidden sm:inline">Add new task</span>
      </Button>
    </header>
  );
}
