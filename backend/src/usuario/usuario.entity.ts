import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'Nome' })
  Nome: string;

  @Column({ name: 'Email', unique: true })
  Email: string;

  @Column({ name: 'SenhaHash' })
  SenhaHash: string;

  @CreateDateColumn({ name: 'CriadoEm' })
  CriadoEm: Date;
}
