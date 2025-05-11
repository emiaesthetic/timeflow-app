import clsx from 'clsx';

import style from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'icon';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant,
  children,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(style.button, {
        [style[`button--${variant}`]]: variant,
        [style[`button--fullWidth`]]: fullWidth,
      })}
      {...props}
    >
      {children}
    </button>
  );
};
