import React from 'react';

import style from './textarea.module.scss';

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ ...props }, ref) => {
  return <textarea className={style.textarea} ref={ref} {...props}></textarea>;
});

TextArea.displayName = 'TextArea';
