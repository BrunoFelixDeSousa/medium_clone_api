import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@app/modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@app/modules/user/user.entity'
import { JwtStrategy } from '@app/modules/auth/strategy/jwt.strategy'
import { LocalStrategy } from '@app/modules/auth/strategy/local.strategy'

import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_KEY_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
