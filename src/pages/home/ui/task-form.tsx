import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Calendar } from '@/shared/ui/calendar';
import { Error } from '@/shared/ui/error';
import { CalendarIcon, TimerIcon } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { TextArea } from '@/shared/ui/textarea';

import { formatDate } from '../lib/format-date';
import { ITaskFormData } from '../model/types';

export const TaskForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: ITaskFormData | undefined;
  onSubmit: (data: ITaskFormData) => void;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<ITaskFormData>({ defaultValues });

  const dateRef = useRef<HTMLInputElement>(null);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
  });

  const updateCalendarPosition = useCallback(() => {
    if (isOpenCalendar && dateRef.current) {
      const rect = dateRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom,
        left: rect.left,
      });
    }
  }, [isOpenCalendar]);

  useLayoutEffect(() => {
    updateCalendarPosition();

    window.addEventListener('resize', updateCalendarPosition);
    window.addEventListener('scroll', updateCalendarPosition);

    return () => {
      window.removeEventListener('resize', updateCalendarPosition);
      window.removeEventListener('scroll', updateCalendarPosition);
    };
  }, [updateCalendarPosition]);

  return (
    <form
      className="mb-8"
      id="taskForm"
      onSubmit={handleSubmit(data => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-6 has-[[data-error='true']]:mb-8">
        <Label children="Title" htmlFor="title" />
        <Input
          {...register('title', {
            required: { value: true, message: 'Required field' },
          })}
          type="text"
          id="title"
          aria-invalid={!!errors.title}
        />
        <Error message={errors.title?.message} />
      </div>

      <div className="mb-6 has-[[data-error='true']]:mb-8">
        <Label children="Description" htmlFor="description" />
        <TextArea
          {...register('description')}
          id="description"
          aria-invalid={!!errors.description}
        />
        <Error message={errors.description?.message} />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-x-8 gap-y-4 justify-between items-center">
        <div className="mb-6 has-[[data-error='true']]:mb-8">
          <Label children="Date" htmlFor="date" />
          <Controller
            name="date"
            control={control}
            rules={{ required: 'Required field' }}
            render={({ field }) => (
              <Calendar
                value={new Date(field.value)}
                input={
                  <div className="relative">
                    <CalendarIcon className="absolute top-1/2 -translate-y-1/2 right-2.5 size-6 pointer-events-none" />
                    <Input
                      value={field.value ? formatDate(field.value) : ''}
                      onClick={() => setIsOpenCalendar(prevState => !prevState)}
                      aria-invalid={!!errors.date}
                      ref={dateRef}
                      readOnly
                    />
                  </div>
                }
                position={calendarPosition}
                isOpen={isOpenCalendar}
                onClose={() => setIsOpenCalendar(false)}
                onSelect={date => {
                  field.onChange(date);
                  setIsOpenCalendar(false);
                }}
              />
            )}
          />
          <Error message={errors.date?.message} />
        </div>

        <div className="mb-6 has-[[data-error='true']]:mb-8">
          <Label children="Duration" htmlFor="duration" />
          <div className="relative">
            <TimerIcon className="absolute top-1/2 -translate-y-1/2 right-2.5 size-6 pointer-events-none" />
            <Input
              {...register('duration', {
                required: { value: true, message: 'Required field' },
                min: { value: 1, message: 'Minimum 1' },
                max: { value: 1440, message: 'Maximum 1440' },
              })}
              className="no-spinner"
              type="number"
              id="duration"
              min="1"
              max="1440"
              step="1"
              aria-invalid={!!errors.duration}
            />
          </div>
          <Error message={errors.duration?.message} />
        </div>
      </div>

      <div className="mb-6 has-[[data-error='true']]:mb-8">
        <Label children="Priority" htmlFor="priority" />
        <Select
          {...register('priority', {
            required: { value: true, message: 'Required field' },
          })}
          id="priority"
          aria-invalid={!!errors.priority}
          options={
            <>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </>
          }
        />
        <Error message={errors.priority?.message} />
      </div>
    </form>
  );
};
