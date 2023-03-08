import { EventModule } from './dynamic/event/event.module';
import { BlogModule } from './dynamic/blog/blog.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data_source';
import { ComponentsModule } from './components/components.module';
import { CollectionModule } from './collection/collection.module';
import { ComponentsValueModule } from './components-value/components-value.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces';

@Module({
  providers: [AppService],
  imports: [
    EventModule,
    BlogModule,

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      uploads: false,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ComponentsModule,
    CollectionModule,
    ComponentsValueModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
