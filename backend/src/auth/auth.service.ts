import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuthService {
  private readonly codeStore = new Map<string, string>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async sendCode(phone: string) {
    const code = '1234';
    this.codeStore.set(phone, code);
    return { phone, code, message: 'mock 验证码已发送' };
  }

  async login(phone: string, code: string) {
    const savedCode = this.codeStore.get(phone);
    if (!savedCode || savedCode !== code) {
      throw new BadRequestException('验证码错误或已失效');
    }

    let user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await this.prisma.user.create({ data: { phone } });
    }

    const token = await this.jwtService.signAsync({ sub: user.id, phone: user.phone });
    return { accessToken: token, user: { id: user.id, phone: user.phone } };
  }
}
