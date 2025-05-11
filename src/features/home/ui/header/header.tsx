import { Button } from '@/shared/ui/button';
import { Layout } from '@/shared/ui/layout';
import { Logo } from '@/shared/ui/logo';

import style from './header.module.scss';

export const Header = () => {
  return (
    <header className={style.header}>
      <Layout>
        <div className={style.header__inner}>
          <Logo />
          <Button variant="primary">Logout</Button>
        </div>
      </Layout>
    </header>
  );
};
