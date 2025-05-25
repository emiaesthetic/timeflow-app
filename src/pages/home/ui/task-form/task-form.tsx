import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Calendar } from '@/shared/ui/calendar';
import { Error } from '@/shared/ui/error';
import { CalendarIcon, TimerIcon } from '@/shared/ui/icons';
import { Input, InputWrapper } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { TextArea } from '@/shared/ui/textarea';

import { formatDate } from '../../lib/formatDate';
import { ITask } from '../../model/types';

import style from './task-form.module.scss';

export const TaskForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: ITask | undefined;
  onSubmit: (data: Omit<ITask, 'id'>) => void;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<ITask>({ defaultValues });

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
      className={style['task-form']}
      id="taskForm"
      onSubmit={handleSubmit(data => {
        onSubmit(data);
        reset();
      })}
    >
      <div className={style['task-form__field']}>
        <Label children="Title" htmlFor="title" />
        <Input
          {...register('title', {
            required: { value: true, message: 'Required field' },
          })}
          type="text"
          id="title"
          aria-invalid={!!errors.title}
        />
        <Error text={errors.title?.message} />
      </div>

      <div className={style['task-form__field']}>
        <Label children="Description" htmlFor="description" />
        <TextArea
          {...register('description')}
          id="description"
          aria-invalid={!!errors.description}
        />
        <Error text={errors.description?.message} />
      </div>

      <div className={style['task-form__datetime']}>
        <div className={style['task-form__field']}>
          <Label children="Date" htmlFor="date" />
          <Controller
            name="date"
            control={control}
            rules={{ required: 'Required field' }}
            render={({ field }) => (
              <Calendar
                value={new Date(field.value)}
                input={
                  <InputWrapper
                    variant="icon-right"
                    icon={
                      <CalendarIcon
                        width="24"
                        height="24"
                        isClickable={false}
                      />
                    }
                  >
                    <Input
                      variant="icon-right"
                      value={field.value ? formatDate(field.value) : ''}
                      onClick={() => setIsOpenCalendar(prevState => !prevState)}
                      aria-invalid={!!errors.date}
                      ref={dateRef}
                      readOnly
                    />
                  </InputWrapper>
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
          <Error text={errors.date?.message} />
        </div>

        <div className={style['task-form__field']}>
          <Label children="Duration" htmlFor="duration" />
          <InputWrapper
            variant="icon-right"
            icon={<TimerIcon width="24" height="24" isClickable={false} />}
          >
            <Input
              {...register('duration', {
                required: { value: true, message: 'Required field' },
                min: { value: 1, message: 'Minimum 1' },
                max: { value: 1440, message: 'Maximum 1440' },
              })}
              variant="icon-right"
              type="number"
              id="duration"
              min="1"
              max="1440"
              step="1"
              aria-invalid={!!errors.duration}
            />
          </InputWrapper>
          <Error text={errors.duration?.message} />
        </div>
      </div>

      <div className={style['task-form__field']}>
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
        <Error text={errors.priority?.message} />
      </div>
    </form>
  );
};
