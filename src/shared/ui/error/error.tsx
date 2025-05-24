import clsx from 'clsx';

import style from './error.module.scss';

interface ErrorProps {
  variant?: 'top-right' | 'bottom-left';
  text: string | undefined;
}

export const Error = ({ variant = 'bottom-left', text }: ErrorProps) => {
  return (
    <p
      className={clsx(style.error, style[`error--${variant}`])}
      data-error={!!text}
    >
      {text}
    </p>
  );
};
