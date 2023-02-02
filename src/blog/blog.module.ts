import { Module } from '@nestjs/common'; 
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Blog } from './entities/blog.entity';


@Module({ 
imports: [TypeOrmModule.forFeature([Blog])],
providers: [BlogService, BlogResolver] 

}) 

export class BlogModule {

}