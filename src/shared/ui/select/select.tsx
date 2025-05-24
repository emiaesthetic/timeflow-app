import { ChevronIcon } from '../icons';

import style from './select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: React.ReactNode;
}

export const Select = ({ options, ...props }: SelectProps) => {
  return (
    <div className={style['select-wrapper']}>
      <select className={style.select} {...props}>
        {options}
      </select>
      <ChevronIcon width="12" height="12" />
    </div>
  );
};
