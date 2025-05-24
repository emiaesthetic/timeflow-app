import React from 'react';
import clsx from 'clsx';

import style from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'icon-left' | 'icon-right';
}

export const InputWrapper = ({
  variant,
  children,
  icon,
}: {
  variant: 'icon-left' | 'icon-right';
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        style['input-wrapper'],
        style[`input-wrapper--${variant}`],
      )}
    >
      {children}
      {icon}
    </div>
  );
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
