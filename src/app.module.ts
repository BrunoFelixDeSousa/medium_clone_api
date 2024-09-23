import { Module } from '@nestjs/common'
import { TagModule } from '@app/tag/tag.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '@app/user/user.module'
import { AuthModule } from './auth/auth.module'
import { ArticleModule } from './article/article.module'

import * as dotenv from 'dotenv'
dotenv.config()

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
    AuthModule,
    ArticleModule,
  ],
})
export class AppModule {}
