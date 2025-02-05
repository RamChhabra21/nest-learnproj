import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from 'typeorm';
import { User } from 'src/typeorm/User';
import entities from 'src/typeorm/Entities';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret : '123',
      signOptions : {expiresIn : '1h'} 
    }),
    TypeOrmModule.forFeature(entities)
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
