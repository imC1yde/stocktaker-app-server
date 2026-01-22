import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/app.module'
import { AppConfig } from '@src/infrastructure/config/app.config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const appConfig = app.get(AppConfig)

  // CORS settings
  app.enableCors({
    origin: appConfig.originUrl,
    credentials: true
  })

  // request pre-validation settings
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  await app.listen(appConfig.port)
}

bootstrap()
