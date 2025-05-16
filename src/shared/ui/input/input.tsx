import React from 'react';
import clsx from 'clsx';

import style from './input.module.scss';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default';
  multiline?: boolean;
}

export const Input = React.forwardRef<InputElement, InputProps>(
  ({ variant = 'default', multiline = false, ...props }, ref) => {
    const className = clsx(style.input, style[`input--${variant}`], {
      [style.textarea]: multiline,
    });

    return multiline ? (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        className={className}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={className}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
