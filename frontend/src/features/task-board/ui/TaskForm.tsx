import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlarmClockIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Calendar } from '@/shared/ui/Calendar';
import { Form } from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';
import { Popover } from '@/shared/ui/Popover';
import { Select } from '@/shared/ui/Select';
import { Textarea } from '@/shared/ui/Textarea';

import { dateApi } from '../lib/dateApi';
import { TaskFormData, TaskFormSchema } from '../model/types';

const defaultValues: TaskFormData = {
  title: '',
  description: '',
  date: new Date(),
  time: '10:00',
  duration: '60',
  priority: 'LOW',
  status: 'PROCESS',
};

export function TaskForm({
  currentTask,
  onSubmit,
}: {
  currentTask?: TaskFormData | null;
  onSubmit: (data: TaskFormData) => void;
}) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: currentTask || defaultValues,
  });

  return (
    <Form {...form}>
      <form
        id="taskForm"
        onSubmit={form.handleSubmit(data => {
          onSubmit(data);
          form.reset();
        })}
      >
        <div className="relative mb-4">
          <Form.Field
            name="title"
            control={form.control}
            render={({ field }) => (
              <Form.Item>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Input type="text" id="title" {...field} />
                <Form.Message />
              </Form.Item>
            )}
          />
        </div>

        <div className="relative mb-4">
          <Form.Field
            name="description"
            control={form.control}
            render={({ field }) => (
              <Form.Item>
                <Form.Label htmlFor="description">Description</Form.Label>
                <Textarea className="resize-none" id="description" {...field} />
                <Form.Message />
              </Form.Item>
            )}
          />
        </div>

        <div className="grid grid-cols-2 items-start justify-between gap-x-8 gap-y-4">
          <div className="relative mb-4">
            <Form.Field
              name="date"
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label htmlFor="date">Date</Form.Label>
                  <Popover>
                    <Popover.Trigger asChild>
                      <div className="relative">
                        <Input
                          id="date"
                          type="text"
                          value={dateApi.formatDateForInput(field.value)}
                          readOnly
                        />
                        <CalendarDaysIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4.5 -translate-y-1/2 opacity-50" />
                      </div>
                    </Popover.Trigger>

                    <Popover.Content
                      className="w-auto p-0 backdrop-blur-2xl"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={{ before: new Date() }}
                        className="rounded-md border shadow-sm"
                      />
                    </Popover.Content>
                  </Popover>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>

          <div className="relative mb-4">
            <Form.Field
              name="time"
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label htmlFor="time">Time</Form.Label>
                  <div className="relative">
                    <Input
                      className="[&::-webkit-calendar-picker-indicator]:hidden"
                      type="time"
                      step="60"
                      id="time"
                      {...field}
                    />
                    <CalendarClockIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4.5 -translate-y-1/2 opacity-50" />
                  </div>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 items-start gap-x-8 gap-y-4">
          <div className="relative mb-4">
            <Form.Field
              name="duration"
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label htmlFor="duration">Duration</Form.Label>
                  <div className="relative">
                    <Input
                      className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      id="duration"
                      step="1"
                      {...field}
                    />
                    <AlarmClockIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4.5 -translate-y-1/2 opacity-50" />
                  </div>
                  <Form.Message data-error="true" />
                </Form.Item>
              )}
            />
          </div>

          <div className="mb-4">
            <Form.Field
              name="priority"
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label htmlFor="priority">Priority</Form.Label>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full">
                        <Select.Value placeholder="Select a priority" />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      <Select.Item value="LOW">Low</Select.Item>
                      <Select.Item value="MEDIUM">Medium</Select.Item>
                      <Select.Item value="HIGH">High</Select.Item>
                    </Select.Content>
                  </Select>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
