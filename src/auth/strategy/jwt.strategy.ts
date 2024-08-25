import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  TokenPayload,
  tokenPayloadSchema,
} from '@app/auth/schemas/tokenPayloadSchema';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    return tokenPayloadSchema.parse(payload);
  }
}
