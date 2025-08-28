export type Provider = 'EMAIL_PASSWORD' | 'GITHUB' | 'GOOGLE';

export type UserId = string;

export type User = {
  id: string;
  email?: string;
  name: string;
  picture: string;
  provider: Provider;
};
