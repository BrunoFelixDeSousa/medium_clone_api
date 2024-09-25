import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './config/env.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'warn', 'verbose'],
  })
  app.setGlobalPrefix('api')

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap().then(() => {
  console.log(
    '🚀 Server is up and running on port 8080! Access it at: http://localhost:8080/api'
  )
})
