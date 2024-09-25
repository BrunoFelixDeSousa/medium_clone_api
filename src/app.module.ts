import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TagModule } from '@app/modules/tag/tag.module'
import { UserModule } from '@app/modules/user/user.module'
import { AuthModule } from '@app/modules/auth/auth.module'
import { ArticleModule } from '@app/modules/article/article.module'
import configuration from '@app/configuration/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      }),
    }),
    TagModule,
    UserModule,
    AuthModule,
    ArticleModule,
  ],
})
export class AppModule {}
