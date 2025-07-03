import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/Button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';

import { AuthFormData, authFormSchema } from '../model/types';

export function AuthForm() {
  const form = useForm<AuthFormData>({ resolver: zodResolver(authFormSchema) });

  return (
    <Form {...form}>
      <form id="authForm">
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
  );
}
