import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { CONFIG } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Form } from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';

import { RegisterFormData, RegisterFormSchema } from '../model/types';
import { useAuth } from '../model/useAuth';

import { OAuthProviders } from './OAuthProviders';

export function RegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { isLoading, register } = useAuth();

  return (
    <Card className="flex-1 bg-transparent">
      <Card.Header>
        <Card.Title className="mb-2 text-2xl">Create an account</Card.Title>
        <Card.Description className="flex gap-x-2">
          <span>Don't have an account?</span>
          <Link className="text-foreground underline" to={CONFIG.ROUTES.LOGIN}>
            Log in
          </Link>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Form {...form}>
          <form
            id="authForm"
            onSubmit={form.handleSubmit((data: RegisterFormData) => {
              register(data);
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
                      disabled={isLoading}
                    />
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                name="name"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label className="pl-2 text-sm" htmlFor="name">
                      Name
                    </Form.Label>
                    <Input
                      type="name"
                      id="name"
                      {...field}
                      disabled={isLoading}
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
                    <Input type="password" id="password" {...field} />
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              Create account
            </Button>
          </form>
        </Form>
      </Card.Content>

      <Card.Footer>
        <OAuthProviders isLoading={isLoading} />
      </Card.Footer>
    </Card>
  );
}
