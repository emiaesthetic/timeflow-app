import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';
import { Separator } from '@/shared/ui/Separator';

import { GITHUB_AUTH_URL } from '../config';
import { LoginFormData, loginFormSchema } from '../model/types';
import { useAuth } from '../model/useAuth';

import { Layout } from './Layout';
import { SocialAuthButtons } from './SocialAuthButtons';

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const { loginAccount } = useAuth();

  return (
    <Layout>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <SocialAuthButtons
            onGitHub={() => {
              window.location.href = GITHUB_AUTH_URL.auth();
            }}
            onGoogle={() => {}}
          />

          <div className="mb-6 flex items-center gap-x-2">
            <Separator className="flex-1/2" />
            <span className="text-muted-foreground text-base text-nowrap">
              or continue with
            </span>
            <Separator className="flex-1/2" />
          </div>

          <Form {...form}>
            <form
              id="authForm"
              onSubmit={form.handleSubmit(data => {
                loginAccount(data);
              })}
            >
              <div className="mb-6 flex flex-col gap-y-4">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input type="email" id="email" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input type="password" id="password" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="justify-center">
          <span className="text-muted-foreground mr-2 block">
            Don't have an account?
          </span>
          <Link className="text-foreground underline" to={ROUTES.REGISTER}>
            Create account
          </Link>
        </CardFooter>
      </Card>
    </Layout>
  );
}
