import { Module } from '@nestjs/common';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from '@app/user/user.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    }),
    TagModule,
    UserModule,
  ],
})
export class AppModule {}
