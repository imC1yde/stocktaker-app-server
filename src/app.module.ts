import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { GraphQLModule } from "@nestjs/graphql"
import { JwtModule } from "@nestjs/jwt"
import { CatalogModule } from '@src/catalog/catalog.module'
import { CoreModule } from '@src/core/core.module'
import { JwtConfig } from '@src/infrastructure/config/jwt.config'
import { InfrastructureModule } from '@src/infrastructure/infrastructure.module'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import { ValidatorModule } from './validator/validator.module'

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
      buildSchemaOptions: {
        dateScalarMode: 'isoDate'
      },
      context: ({ req }) => ({ req })
    }),
    CoreModule,
    CatalogModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        graphqlUploadExpress({
          maxFileSize: 1000,
          maxFiles: 2
        })
      )
      .forRoutes('graphql')
  }
}