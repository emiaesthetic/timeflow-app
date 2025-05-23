import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Calendar } from '@/shared/ui/calendar';
import { CalendarIcon, TimerIcon } from '@/shared/ui/icons';
import { Input, InputWrapper } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { TextArea } from '@/shared/ui/textarea';

import { formatDate } from '../../lib/formatDate';
import { ITask } from '../../model/types';

import style from './task-form.module.scss';

export const TaskForm = ({
  onSubmit,
}: {
  onSubmit: (data: Omit<ITask, 'id'>) => void;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<Omit<ITask, 'id'>>();

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  return (
    <form
      className={style['task-form']}
      id="taskForm"
      action="/"
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
      </div>

      <div className={style['task-form__field']}>
        <Label children="Description" htmlFor="description" />
        <TextArea
          {...register('description')}
          id="description"
          aria-invalid={!!errors.description}
        />
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
                      readOnly
                    />
                  </InputWrapper>
                }
                isOpen={isOpenCalendar}
                onClose={() => setIsOpenCalendar(false)}
                onSelect={field.onChange}
              />
            )}
          />
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
                pattern: {
                  value: /^\d+$/,
                  message: 'Numerical value',
                },
              })}
              variant="icon-right"
              type="text"
              id="duration"
              aria-invalid={!!errors.duration}
            />
          </InputWrapper>
        </div>
      </div>

      <div className={style['task-form__field']}>
        <Label children="Priority" htmlFor="priority" />
        <select
          {...register('priority', {
            required: { value: true, message: 'Required field' },
          })}
          className={style['task-form__select']}
          id="priority"
          aria-invalid={!!errors.priority}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </form>
  );
};
