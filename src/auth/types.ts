import { IsNotEmpty } from 'class-validator';
import { Request } from 'express';

export class authDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
export interface IGetUserAuthInfo extends Request {
  user: string;
}
export interface IUser {
  userId: number;
  login: string;
}
export interface ISignInInfo {
  access_token: string;
  user: IUser;
}
