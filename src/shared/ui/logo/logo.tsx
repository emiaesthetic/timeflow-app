import LogoIcon from './img/logo.svg?react';

import style from './logo.module.scss';

export const Logo = () => {
  return (
    <a className={style.logo} href="/">
      <LogoIcon width="24" height="24" aria-hidden="true" />
      TimeFlow
    </a>
  );
};
