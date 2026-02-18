import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { GraphQLModule } from "@nestjs/graphql"
import { CatalogModule } from '@src/catalog/catalog.module'
import { CoreModule } from '@src/core/core.module'
import { InfrastructureModule } from '@src/infrastructure/infrastructure.module'
import { ValidatorModule } from '@src/validation/validator.module'
import { graphqlUploadExpress } from 'graphql-upload-ts'

@Module({
  imports: [
    InfrastructureModule,
    ValidatorModule,
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
          maxFileSize: 8 * 1024 * 1024,
          maxFiles: 2
        })
      )
      .forRoutes('graphql')
  }
}