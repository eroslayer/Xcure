import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { phone: string; otp: string }) {
    return { code: 0, message: 'ok', data: this.authService.login(body.phone), requestId: 'mock-req' };
  }

  @Post('refresh')
  refresh() {
    return { code: 0, message: 'ok', data: { accessToken: 'new-mock-access-token' }, requestId: 'mock-req' };
  }
}
