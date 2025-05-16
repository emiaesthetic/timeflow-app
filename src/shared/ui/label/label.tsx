import style from './label.module.scss';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className={style.label} {...props}>
      {children}
    </label>
  );
};
