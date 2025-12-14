import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import Configuration from '@src/configs/configuration'

@Module({
  imports: [
      PrismaModule,
      UserModule,
      ConfigModule.forRoot({
        envFilePath: ['.env'],
        load: [Configuration],
        isGlobal: true
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}