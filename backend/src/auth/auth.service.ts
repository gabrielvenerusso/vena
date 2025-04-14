import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from '../usuario/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';
import { Console } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { Email: email } });
  
    if (!usuario || usuario.SenhaHash !== senha) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
  
    const payload = { sub: usuario.Id, email: usuario.Email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async register({ email, senha, nome }: { email: string, senha: string, nome: string }) {
    const existente = await this.usuarioRepository.findOne({ where: { Email: email } });
    if (existente) throw new ConflictException('Email já cadastrado');
  
    const novo = this.usuarioRepository.create({
      Email: email,
      SenhaHash: senha,
      Nome: nome,
    });
  
    await this.usuarioRepository.save(novo);
    return { message: 'Usuário registrado com sucesso' };
  }
  
}
