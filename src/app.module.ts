import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import Configuration from '@src/configs/configuration'
import { PrismaModule } from '@src/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      PrismaModule,
      UserModule,
      ConfigModule.forRoot({
        envFilePath: ['.env'],
        load: [Configuration],
        isGlobal: true,
        expandVariables: true
      }),
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}