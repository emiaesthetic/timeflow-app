import style from './checkbox.module.scss';

export const Checkbox = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={style.checkbox} type="checkbox" {...props} />;
};
