import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Error } from '@/shared/ui/error';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Notification } from '@/shared/ui/notification';

import { IAuthForm } from './types';

import style from './page.module.scss';

const TEST_CREDENTIALS: IAuthForm = {
  email: 'user123@gmail.com',
  password: '12345',
};

const AuthHeader = () => {
  return (
    <div className={style.header}>
      <h1 className={style.header__title}>Login</h1>
      <p className={style.header__subtitle}>
        Welcome back, please login to your account
      </p>
    </div>
  );
};

const AuthForm = ({ onSubmit }: { onSubmit: (data: IAuthForm) => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthForm>();

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.form__field}>
        <Label children="Email" htmlFor="email" />
        <Input
          {...register('email', {
            required: { value: true, message: 'Required field' },
          })}
          type="email"
          id="email"
          aria-invalid={!!errors.email}
        />
        <Error text={errors.email?.message} />
      </div>

      <div className={style.form__field}>
        <Label children="Password" htmlFor="password" />
        <Input
          {...register('password', {
            required: { value: true, message: 'Required field' },
          })}
          type="password"
          id="password"
          aria-invalid={!!errors.password}
        />
        <Error text={errors.password?.message} />
      </div>

      <Button type="submit">Sign In</Button>
    </form>
  );
};

export const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (data: IAuthForm) => {
    if (
      data.email === TEST_CREDENTIALS.email &&
      data.password === TEST_CREDENTIALS.password
    ) {
      setErrorMessage('');
      navigate('/');
    } else {
      setErrorMessage('Invalid login or password');
    }
  };

  return (
    <>
      <Dialog
        header={<AuthHeader />}
        body={<AuthForm onSubmit={handleSubmit} />}
        canClose={false}
        className="auth"
        id="auth"
        aria-label="Auth form"
      />

      {errorMessage && (
        <Notification
          container={document.getElementById('dialog-portal-overlay')!}
          type="error"
          message={errorMessage}
        />
      )}
    </>
  );
};
