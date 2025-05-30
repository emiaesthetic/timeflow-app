import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Layout } from '@/shared/ui/layout';
import { Logo } from '@/shared/ui/logo';

import style from './header.module.scss';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <Layout>
        <div className={style.header__inner}>
          <Logo />
          <Button variant="dark" onClick={() => navigate('/auth')}>
            Logout
          </Button>
        </div>
      </Layout>
    </header>
  );
};
