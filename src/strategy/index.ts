import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) {
          return null;
        }
        return req.cookies.token;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, login: payload.login };
  }
}
