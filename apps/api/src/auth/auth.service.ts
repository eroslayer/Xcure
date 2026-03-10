import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(phone: string) {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: { id: 'user-001', role: 'parent', phone },
    };
  }
}
