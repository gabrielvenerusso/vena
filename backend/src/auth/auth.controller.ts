import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string, senha: string }) {
    return this.authService.login(body.email, body.senha);
  }

  @Post('registro')
  async register(@Body() body: { email: string, senha: string, nome: string }) {
  return this.authService.register(body);
}

}