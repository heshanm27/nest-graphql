 
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { ProductModule } from './product/product.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data_source';
import { ComponentsModule } from './components/components.module';
import { CollectionModule } from './collection/collection.module';
import { ComponentsValueModule } from './components-value/components-value.module';

@Module({
  imports: [
 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ProductModule,
    ComponentsModule,
    CollectionModule,
    ComponentsValueModule,
  ],
})
export class AppModule {}
