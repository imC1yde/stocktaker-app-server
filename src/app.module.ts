import { type ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import Configuration from '@src/configs/configuration'
import { graphqlConfig } from "@src/configs/graphql.config";
import { jwtConfig } from '@src/configs/jwt.config';
import { CoreModule } from '@src/core/core.module';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: [ '.env' ],
      load: [ Configuration ],
      isGlobal: true,
      expandVariables: true
    }),
    JwtModule.register(jwtConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    CoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}