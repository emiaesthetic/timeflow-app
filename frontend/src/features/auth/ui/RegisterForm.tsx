import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { CONFIG } from '@/shared/config';
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

import { RegisterFormData, RegisterFormSchema } from '../model/types';
import { useAuth } from '../model/useAuth';

import { Layout } from './Layout';

export function RegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { isLoading, registerAccount } = useAuth();

  return (
    <Layout>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
        </CardHeader>
        <CardContent>
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
              onSubmit={form.handleSubmit((data: RegisterFormData) => {
                registerAccount(data);
              })}
            >
              <div className="mb-6 flex flex-col gap-y-4">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        type="email"
                        id="email"
                        {...field}
                        disabled={isLoading}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        type="name"
                        id="name"
                        {...field}
                        disabled={isLoading}
                      />
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

              <Button className="w-full" type="submit" disabled={isLoading}>
                Create account
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="justify-center">
          <span className="text-muted-foreground mr-2 block">
            Don't have an account?
          </span>
          <Link className="text-foreground underline" to={CONFIG.ROUTES.LOGIN}>
            Login
          </Link>
        </CardFooter>
      </Card>
    </Layout>
  );
}
