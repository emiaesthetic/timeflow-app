import React from 'react';
import clsx from 'clsx';

import style from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'icon-left' | 'icon-right';
}

export const InputWrapper = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  <div className={style['input-wrapper']}>
    {children}
    {icon}
  </div>;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', type = 'text', ...props }, ref) => {
    return (
      <input
        className={clsx(style.input, style[`input--${variant}`])}
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
