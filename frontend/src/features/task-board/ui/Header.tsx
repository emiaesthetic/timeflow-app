import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/ui/Button';

export function Header({ onOpenCreator }: { onOpenCreator: () => void }) {
  return (
    <header className="mb-8 flex items-center justify-between gap-x-8">
      <h2 className="text-4xl font-bold">Task List</h2>

      <Button
        className="size-10 sm:size-auto"
        type="button"
        onClick={onOpenCreator}
        aria-label="Add new task"
      >
        <PlusIcon className="size-6" aria-hidden="true" />
        <span className="hidden sm:inline">Add new task</span>
      </Button>
    </header>
  );
}
