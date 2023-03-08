import { Module } from '@nestjs/common';
import { BlogComponentsService } from './blog-components.service';
import { BlogComponentsResolver } from './blog-components.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogComponent } from './entities/blog-components.entity';
import { Collection } from 'src/collection/entities/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogComponent]),
    TypeOrmModule.forFeature([Collection]),
  ],
  providers: [BlogComponentsResolver, BlogComponentsService],
  exports: [BlogComponentsService],
})
export class BlogComponentsModule {}
