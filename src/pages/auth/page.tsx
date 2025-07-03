import { AuthForm, SocialAuthButtons } from '@/features/auth';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card';
import { Separator } from '@/shared/ui/Separator';

export function AuthPage() {
  return (
    <main className="grid h-screen grid-cols-1 grid-rows-1 place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription className="text-base">
            Enter an email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SocialAuthButtons />

          <div className="mb-6 flex items-center gap-x-2">
            <Separator className="flex-1/2" />
            <span className="text-muted-foreground text-base text-nowrap">
              or continue with
            </span>
            <Separator className="flex-1/2" />
          </div>

          <AuthForm />
        </CardContent>
      </Card>
    </main>
  );
}
