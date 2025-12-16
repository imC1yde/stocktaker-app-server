import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: 'schema.gql',
  playground: true,
  introspection: true,
}