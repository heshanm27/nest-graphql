import { BlogModule } from './dynamic/blog/blog.module';
import { MovieModule } from './dynamic/movie/movie.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data_source';
import { ComponentsModule } from './components/components.module';
import { CollectionModule } from './collection/collection.module';
import { ComponentsValueModule } from './components-value/components-value.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BlogModule,
    MovieModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ComponentsModule,
    CollectionModule,
    ComponentsValueModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
