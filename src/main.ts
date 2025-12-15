import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/app.module'
import Configuration from '@src/configs/configuration'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(Configuration().app.PORT)
}

bootstrap();
