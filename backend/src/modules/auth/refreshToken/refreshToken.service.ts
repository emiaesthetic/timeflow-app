import { ApiError } from '@/common/errors/apiError';

import { RefreshTokenRepository } from './refreshToken.repository';
import { RefreshTokenPayload } from './refreshToken.schema';

export class RefreshTokenService {
  private refreshTokenRepository: RefreshTokenRepository;

  constructor(refreshTokenRepository: RefreshTokenRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async upsertRefreshToken(payload: Omit<RefreshTokenPayload, 'expiryDate'>) {
    const oldRefreshToken = await this.refreshTokenRepository.findByUserId(
      payload.userId,
    );

    const newRefreshToken = {
      token: payload.token,
      userId: payload.userId,
      issuedAt: new Date(),
      expiryDate: this.computeExpiryDate(),
    };

    if (oldRefreshToken) {
      this.refreshTokenRepository.update(newRefreshToken);
    } else {
      this.refreshTokenRepository.create(newRefreshToken);
    }
  }

  async deleteRefreshToken(token: string) {
    await this.refreshTokenRepository.delete(token);
  }

  async findRefreshToken(token: string) {
    const existingToken = await this.refreshTokenRepository.findByToken(token);

    if (!existingToken) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    return existingToken;
  }

  private computeExpiryDate() {
    const now = new Date();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    return new Date(now.getTime() + sevenDaysInMs);
  }
}
