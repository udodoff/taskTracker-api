import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config.module';
import { UserModule } from '@entities/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { TaskModule } from '@entities/task/task.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ['dist/entities/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
