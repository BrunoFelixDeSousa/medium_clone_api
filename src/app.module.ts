import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TagModule } from '@app/modules/tag/tag.module'
import { UserModule } from '@app/modules/user/user.module'
import { AuthModule } from '@app/modules/auth/auth.module'
import { ArticleModule } from '@app/modules/article/article.module'
import configuration, { Env } from '@app/config/env.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration], // Carregando a configuração personalizada
      isGlobal: true, // Tornando o módulo de configuração global
      cache: true, // Cache para melhorar desempenho de `ConfigService#get`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => ({
        type: 'postgres',
        port: configService.get('DATABASE_PORT'),
        host: configService.get('DATABASE_HOST'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        logging: ['query'],
      }),
    }),
    TagModule,
    UserModule,
    AuthModule,
    ArticleModule,
  ],
})
export class AppModule {}
