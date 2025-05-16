import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import style from './task-form.module.scss';

export const TaskForm = () => {
  return (
    <form className={style['task-form']} id="taskForm" action="/">
      <div className={style['task-form__field']}>
        <Label children="Title" htmlFor="title" />
        <Input type="text" name="title" id="title" />
      </div>

      <div className={style['task-form__field']}>
        <Label children="Description" htmlFor="description" />
        <Input type="text" multiline name="description" id="description" />
      </div>

      <div className={style['task-form__datetime']}>
        <div className={style['task-form__field']}>
          <Label children="Date" htmlFor="date" />
          <Input type="date" name="date" id="date" />
        </div>

        <div className={style['task-form__field']}>
          <Label children="Time" htmlFor="time" />
          <Input type="time" name="time" id="time" />
        </div>

        <div className={style['task-form__field']}>
          <Label children="Duration" htmlFor="duration" />
          <Input type="time" name="duration" id="duration" />
        </div>
      </div>
    </form>
  );
};
