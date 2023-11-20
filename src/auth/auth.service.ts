import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../entities/user/user.service';
import { hash, verify } from 'argon2';
import { User } from '@entities/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ISignInInfo } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<ISignInInfo> {
    const user = await this.userService.findOne(login);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const valid = await verify(user.password, pass);
    if (!valid) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = { sub: user.id, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        userId: user.id,
        login: user.login,
      },
    };
  }

  async checkAuth(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub,
      login: payload.login,
    };
  }

  async signUp(login: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(login);
    if (user) {
      throw new UnauthorizedException();
    }
    const hashedPass = await hash(pass);
    return await this.userService.create(login, hashedPass);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
