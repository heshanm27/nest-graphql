import { BlogComponentsModule } from './component/blog-components.module';
import { Module } from '@nestjs/common';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Blog } from './entities/blog.entity';
import { BlogImage } from './entities/blog.image.entity';

@Module({
  imports: [BlogComponentsModule, TypeOrmModule.forFeature([Blog, BlogImage])],

  providers: [BlogService, BlogResolver],
})
export class BlogModule {}
