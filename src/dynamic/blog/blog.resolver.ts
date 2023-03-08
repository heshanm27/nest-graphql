import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';

import { BlogFilterInput } from './dto/filter_blog_input';
import { BlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { FileUpload } from './dto/file-upload-dto';
import { GraphQLUpload } from 'graphql-upload-minimal';
// import GraphQLUpload from 'graphql-upload/GraphQLUpload';// import { FileUpload } from './dto/file-upload-dto';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => Blog)
  async createBlog(@Args('BlogInput') BlogInput: BlogInput): Promise<Blog> {
    return await this.blogService.create(BlogInput);
  }

  @Query(() => [Blog], { name: 'findAllBlog' })
  async findAll(
    @Args('FilterOptions', { nullable: true }) filteroptions: BlogFilterInput,
  ): Promise<Blog[]> {
    return this.blogService.findAll(filteroptions);
  }

  @Query(() => Blog, { name: 'findOneBlog' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  // @Mutation(() => Boolean, { name: 'uploadFile' })
  // async uploadFile(
  //   @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  // ) {
  //   console.log(file);
  //   return true;
  // }

  @Mutation(() => Blog)
  updateBlog(
    @Args('updateBlogInput') updateBlogInput: UpdateBlogInput,
  ): Promise<Blog> {
    return this.blogService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => Int }) id: number): Promise<Blog> {
    return this.blogService.remove(id);
  }
}
