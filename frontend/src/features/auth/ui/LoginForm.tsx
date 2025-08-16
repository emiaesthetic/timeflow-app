import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { CONFIG } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Form } from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';

import { LoginFormData, LoginFormSchema } from '../model/types';
import { useLoginMutation } from '../model/useLoginMutation';

import { OAuthProviders } from './OAuthProviders';

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { isPending, mutate: login } = useLoginMutation();

  return (
    <Card className="flex-1 bg-transparent">
      <Card.Header>
        <Card.Title className="mb-2 text-2xl">Login to your account</Card.Title>
        <Card.Description className="flex gap-x-2">
          <span className="text-muted-foreground">Don't have an account?</span>
          <Link
            className="text-foreground underline"
            to={CONFIG.ROUTES.REGISTER}
          >
            Create an account
          </Link>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Form {...form}>
          <form
            id="authForm"
            onSubmit={form.handleSubmit(data => {
              login(data);
            })}
          >
            <div className="mb-6 flex flex-col gap-y-4">
              <Form.Field
                name="email"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label className="pl-2 text-sm" htmlFor="email">
                      Email
                    </Form.Label>
                    <Input
                      type="email"
                      id="email"
                      {...field}
                      disabled={isPending}
                    />
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                name="password"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label className="pl-2 text-sm" htmlFor="password">
                      Password
                    </Form.Label>
                    <Input
                      type="password"
                      id="password"
                      {...field}
                      disabled={isPending}
                    />
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </Card.Content>

      <Card.Footer>
        <OAuthProviders isLoading={isPending} />
      </Card.Footer>
    </Card>
  );
}
