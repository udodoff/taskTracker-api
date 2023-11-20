import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOne(login: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { login } });
  }

  async create(login: string, password: string): Promise<User> {
    const user = new User();
    user.login = login;
    user.password = password;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
