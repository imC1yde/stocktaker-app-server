import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from '@nestjs/common'
import { GraphQLModule } from "@nestjs/graphql"
import { JwtModule } from "@nestjs/jwt"
import { CatalogModule } from '@src/catalog/catalog.module'
import { CoreModule } from '@src/core/core.module'
import { JwtConfig } from '@src/infrastructure/config/jwt.config'
import { InfrastructureModule } from '@src/infrastructure/infrastructure.module';
import { ValidatorModule } from './validator/validator.module';

@Module({
  imports: [
    InfrastructureModule,
    ValidatorModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ JwtConfig ],
      useFactory: (config: JwtConfig) => ({
        secret: config.jwtSecret
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: false,
      introspection: true,
      context: ({ req }) => ({ req })
    }),
    CoreModule,
    CatalogModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}