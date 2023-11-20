import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config.module';
import { UserModule } from '@entities/user/user.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { AuthModule } from '@auth/auth.module';
import { TaskModule } from '@entities/task/task.module';

@Module({
  imports: [ConfigModule, UserModule, TypeOrmModule, AuthModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
