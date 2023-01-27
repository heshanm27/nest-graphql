import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionResolver } from './collection.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { ComponentsModule } from '../components/components.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collection]), ComponentsModule],
  providers: [CollectionResolver, CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
