export type RefreshTokenPayload = {
  token: string;
  expiryDate: Date;
  userId: string;
  issuedAt?: Date;
  revoked?: boolean;
};
