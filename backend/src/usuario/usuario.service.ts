import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuarios)
    private usuarioRepo: Repository<Usuarios>,
  ) {}

  async buscarPorEmail(email: string): Promise<Usuarios | null> {
    return this.usuarioRepo.findOne({ where: { Email: email } });
  }  

  async criar(usuario: Partial<Usuarios>): Promise<Usuarios> {
    const novoUsuario = this.usuarioRepo.create(usuario);
    return this.usuarioRepo.save(novoUsuario);
  }
}