import {
  Controller,
  Post,
  Get,
  Res,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { IGetUserAuthInfo, authDto } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Res() res: Response, @Body() signUpDto: authDto) {
    await this.authService.signUp(signUpDto.login, signUpDto.password);
    return res.status(201).json({ status: 'ok' });
  }

  @Post('signin')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: authDto,
  ) {
    const signInInfo = await this.authService.signIn(
      signInDto.login,
      signInDto.password,
    );

    res.cookie('token', signInInfo.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return { status: 'ok', user: signInInfo.user };
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllUsers(@Res() res: Response, @Req() req: IGetUserAuthInfo) {
    const users = await this.authService.getAllUsers();
    return res.json({ user: req.user, users });
  }

  @UseGuards(AuthGuard)
  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.status(200).clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { status: 'ok' };
  }

  @UseGuards(AuthGuard)
  @Get('/check')
  async check(@Res() res: Response, @Req() req: IGetUserAuthInfo) {
    const payload = await this.authService.checkAuth(req.cookies.token);
    return res.status(200).json({ user: payload });
  }
}
