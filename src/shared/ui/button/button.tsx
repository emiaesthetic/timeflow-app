import clsx from 'clsx';

import style from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'light' | 'dark' | 'icon';
  center?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant,
  children,
  center = false,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(style.button, {
        [style[`button--${variant}`]]: variant,
        [style[`button--center`]]: center,
        [style[`button--fullWidth`]]: fullWidth,
      })}
      {...props}
    >
      {children}
    </button>
  );
};
