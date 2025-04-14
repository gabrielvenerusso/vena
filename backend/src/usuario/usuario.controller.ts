import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('usuarios')
export class UsuarioController {
  @UseGuards(JwtAuthGuard)
  @Get('protegido')
  getDados(@Request() req) {
    return { message: 'Acesso autorizado', user: req.user };
  }
}
