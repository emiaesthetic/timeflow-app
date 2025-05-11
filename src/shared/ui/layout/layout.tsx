import style from './layout.module.scss';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.container}>{children}</div>;
};
