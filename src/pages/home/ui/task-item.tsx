import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { DropdownMenu } from '@/shared/ui/dropdown-menu';
import { CrossIcon, DottedIcon, EditIcon, PlayIcon } from '@/shared/ui/icons';

import { formatDateParts } from '../lib/format-date';
import { ITask } from '../model/types';

import style from './task-item.module.scss';

interface ITaskItemProps extends ITask {
  onStart: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

export const TaskItem = ({
  title,
  description,
  date,
  duration,
  priority,
  onStart,
  onEdit,
  onRemove,
}: ITaskItemProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { displayDate, displayTime, dateAttr, timeAttr } =
    formatDateParts(date);

  return (
    <article
      className={clsx(style.task, style[`task--${priority}`], {
        [style['task--has-open-dropdown']]: isOpenDropdown,
      })}
    >
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
            <time className={style.task__date} dateTime={dateAttr}>
              {displayDate},
            </time>
            <time className={style.task__time} dateTime={timeAttr}>
              {displayTime}
            </time>
          </div>

          <data
            className={style.task__duration}
            value={`PT${duration / 60_000}M`}
          >
            {duration / 60_000} minutes
          </data>
        </div>
      </div>

      <div className={style.task__actions}>
        <ul className={`${style['task__actions-list']} hidden-laptop`}>
          <li className={style['task__actions-item']}>
            <Button variant="icon" onClick={onStart}>
              <PlayIcon width="32" height="32" />
            </Button>
          </li>
          <li className={style['task__actions-item']}>
            <Button variant="icon" onClick={onEdit}>
              <EditIcon width="32" height="32" />
            </Button>
          </li>
          <li className={style['task__actions-item']}>
            <Button variant="icon" onClick={onRemove}>
              <CrossIcon width="32" height="32" />
            </Button>
          </li>
        </ul>

        <DropdownMenu
          className="visible-laptop"
          trigger={{
            children: <DottedIcon />,
            variant: 'icon',
            ariaLabel: 'Open task menu',
          }}
          items={[
            {
              label: 'Start',
              icon: <PlayIcon width="20" height="20" />,
              onClick: () => {
                onStart();
                setIsOpenDropdown(false);
              },
            },
            {
              label: 'Edit',
              icon: <EditIcon width="20" height="20" />,
              onClick: () => {
                onEdit();
                setIsOpenDropdown(false);
              },
            },
            {
              label: 'Delete',
              icon: <CrossIcon width="20" height="20" />,
              onClick: () => {
                onRemove();
                setIsOpenDropdown(false);
              },
            },
          ]}
          isOpen={isOpenDropdown}
          onToggle={() => setIsOpenDropdown(!isOpenDropdown)}
        />
      </div>

      <div className={`${style.task__complete} visible-mobile-large`}>
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>
    </article>
  );
};
