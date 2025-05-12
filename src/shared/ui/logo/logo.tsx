import { LogoIcon } from '../icons';

import style from './logo.module.scss';

export const Logo = () => {
  return (
    <a className={style.logo} href="/">
      <LogoIcon width="24" height="24" />
      TimeFlow
    </a>
  );
};
