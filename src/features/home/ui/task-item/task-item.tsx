import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { CrossIcon, DottedIcon, EditIcon, PlayIcon } from '@/shared/ui/icons';

import { ITask } from '../../model/types';

import style from './task-item.module.scss';

export const TaskItem = ({
  title,
  description,
  date,
  time,
  duration,
  priority,
}: ITask) => {
  return (
    <article className={`${style.task} ${style[`task--${priority}`]}`}>
      <div className={`${style.task__complete} hidden-mobile-large`}>
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>

      <div className={style.task__content}>
        <div className={style.task__details}>
          <h3 className={style.task__name}>{title}</h3>
          <p className={style.task__description}>{description}</p>
        </div>

        <div className={style.task__schedule}>
          <div className={style.task__datetime}>
            <time className={style.task__date} dateTime="2025-09-10">
              {date},
            </time>
            <time className={style.task__time} dateTime="06:40">
              {time}
            </time>
          </div>

          <data className={style.task__duration} value="PT30M">
            {duration}
          </data>
        </div>
      </div>

      <div className={style.task__actions}>
        <ul className={`${style['task__actions-list']} hidden-laptop`}>
          <li className={style['task__actions-item']}>
            <Button variant="icon">
              <PlayIcon width="32" height="32" />
            </Button>
          </li>
          <li className={style['task__actions-item']}>
            <Button variant="icon">
              <EditIcon width="32" height="32" />
            </Button>
          </li>
          <li className={style['task__actions-item']}>
            <Button variant="icon">
              <CrossIcon width="32" height="32" />
            </Button>
          </li>
        </ul>

        <div className="visible-laptop">
          <Button variant="icon">
            <DottedIcon width="32" height="32" />
          </Button>
        </div>

        <ul className={`${style['dropdown-actions']} visible-laptop`}>
          <li className={`${style['dropdown-actions__item']}`}>
            <Button variant="icon">
              <PlayIcon width="20" height="20" />
              Start
            </Button>
          </li>

          <li className={`${style['dropdown-actions__item']}`}>
            <Button variant="icon">
              <EditIcon width="20" height="20" />
              Edit
            </Button>
          </li>

          <li className={`${style['dropdown-actions__item']}`}>
            <Button variant="icon">
              <CrossIcon width="20" height="20" />
              Delete
            </Button>
          </li>
        </ul>
      </div>

      <div className={`${style.task__complete} visible-mobile-large`}>
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>
    </article>
  );
};
