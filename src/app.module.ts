import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagModule } from '@app/modules/tag/tag.module'
import { UserModule } from '@app/modules/user/user.module'
import { AuthModule } from '@app/modules/auth/auth.module'
import { ArticleModule } from '@app/modules/article/article.module'
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
