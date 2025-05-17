import { useForm } from 'react-hook-form';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { ITask } from '../../model/types';

import style from './task-form.module.scss';

export const TaskForm = ({ onSubmit }: { onSubmit: (data: ITask) => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ITask>();

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
            required: { value: true, message: 'Обязательное поле' },
          })}
          type="text"
          id="title"
          aria-invalid={!!errors.title}
        />
      </div>

      <div className={style['task-form__field']}>
        <Label children="Description" htmlFor="description" />
        <Input
          {...register('description')}
          type="text"
          multiline
          id="description"
        />
      </div>

      <div className={style['task-form__datetime']}>
        <div className={style['task-form__field']}>
          <Label children="Date" htmlFor="date" />
          <Input
            {...register('date', {
              required: { value: true, message: 'Обязательное поле' },
            })}
            type="date"
            id="date"
            aria-invalid={!!errors.date}
          />
        </div>

        <div className={style['task-form__field']}>
          <Label children="Time" htmlFor="time" />
          <Input
            {...register('time', {
              required: { value: true, message: 'Обязательное поле' },
            })}
            type="time"
            id="time"
            aria-invalid={!!errors.time}
          />
        </div>

        <div className={style['task-form__field']}>
          <Label children="Duration" htmlFor="duration" />
          <Input
            {...register('duration', {
              required: { value: true, message: 'Обязательное поле' },
            })}
            type="number"
            id="duration"
            aria-invalid={!!errors.duration}
          />
        </div>
      </div>

      <div className={style['task-form__field']}>
        <Label children="Priority" htmlFor="priority" />
        <select
          {...register('priority', {
            required: { value: true, message: 'Обязательное поле' },
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
