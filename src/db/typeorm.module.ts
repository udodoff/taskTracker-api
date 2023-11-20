import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrm.forRoot({
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
})
export class TypeOrmModule {}
