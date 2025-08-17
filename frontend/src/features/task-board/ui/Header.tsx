import { FilterIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';

import { FilterState } from '../model/useTasksFilter';

export function Header({
  onChangeFilter,
  onOpenCreator,
}: {
  onChangeFilter: (value: FilterState) => void;
  onOpenCreator: () => void;
}) {
  return (
    <header className="mb-8 flex items-start justify-between gap-x-4">
      <h2 className="text-3xl font-bold">Today's tasks</h2>
      <Select
        defaultValue="ALL"
        onValueChange={value => onChangeFilter(value as FilterState)}
      >
        <Select.Trigger
          className="bg-primary text-primary-foreground data-[placeholder]:text-primary-foreground [&_svg:not([class*='text-'])]:text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/90 ml-auto size-10 border-0 px-2 py-2 shadow-xs sm:size-auto sm:px-4 [&>svg:last-child]:hidden"
          aria-label="Filter tasks"
        >
          <FilterIcon className="size-6" aria-hidden="true" />
          <Select.Value placeholder="All" />
        </Select.Trigger>

        <Select.Content>
          <Select.Item value="ALL">All</Select.Item>
          <Select.Item value="PROCESS">Process</Select.Item>
          <Select.Item value="DONE">Done</Select.Item>
          <Select.Item value="LOW">Low</Select.Item>
          <Select.Item value="MEDIUM">Medium</Select.Item>
          <Select.Item value="HIGH">High</Select.Item>
        </Select.Content>
      </Select>
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
