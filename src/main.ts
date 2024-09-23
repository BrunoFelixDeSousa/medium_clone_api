import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  await app.listen(8080)
}
bootstrap().then(() => {
  console.log(
    '🚀 Server is up and running on port 8080! Access it at: http://localhost:8080/api'
  )
})
