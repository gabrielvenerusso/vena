import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'gabrielv',
      password: '123456',
      database: 'TransportadoraDB',
      options: { trustServerCertificate: true },
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),    
    AuthModule,
    UsuarioModule,
  ],
})
export class AppModule {}