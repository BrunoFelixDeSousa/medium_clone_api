// src/config/database.config.ts
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Env } from './env.config'

export const getTypeOrmConfig = (
  configService: ConfigService<Env, true>
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get('NODE_ENV') === 'development', // Sincronizar apenas em desenvolvimento
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  logging:
    configService.get('NODE_ENV') === 'development'
      ? ['query', 'error']
      : false, // Ativar logging apenas em desenvolvimento
  extra: {
    lazyRelations: true, // Lazy-loading nas relações do TypeORM
  },
})
