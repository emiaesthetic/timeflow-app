import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlarmClockIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Calendar } from '@/shared/ui/Calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select';
import { Textarea } from '@/shared/ui/Textarea';

import { dateApi } from '../lib/dateApi';
import { TaskFormData, taskFormSchema } from '../model/types';

const defaultValues: TaskFormData = {
  title: '',
  description: '',
  date: new Date(),
  time: '10:00',
  duration: '60',
  priority: 'low',
};

export function TaskForm({
  currentTask,
  onSubmit,
}: {
  currentTask?: TaskFormData | null;
  onSubmit: (data: TaskFormData) => void;
}) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
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
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input type="text" id="title" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="relative mb-4">
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea className="resize-none" id="description" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 items-start justify-between gap-x-8 gap-y-4">
          <div className="relative mb-4">
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Input
                          id="date"
                          type="text"
                          value={dateApi.formatDateForInput(field.value)}
                          readOnly
                        />
                        <CalendarDaysIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4.5 -translate-y-1/2 opacity-50" />
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={{ before: new Date() }}
                        className="rounded-md border shadow-sm"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="relative mb-4">
            <FormField
              name="time"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="time">Time</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 items-start gap-x-8 gap-y-4">
          <div className="relative mb-4">
            <FormField
              name="duration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="duration">Duration</FormLabel>
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
                  <FormMessage data-error="true" />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4">
            <FormField
              name="priority"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="priority">Priority</FormLabel>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
