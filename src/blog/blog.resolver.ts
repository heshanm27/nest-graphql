import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';

import { BlogFilterInput } from './dto/filter_blog_input';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';



@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => Blog)
  async createBlog(
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
  ): Promise<Blog> {
    return await this.blogService.create(createBlogInput);
  }

  @Query(() => [Blog], { name: 'findAllBlog' })
  async findAll(
    @Args('FilterOptions') filteroptions: BlogFilterInput,
  ): Promise<Blog[]> {
    return this.blogService.findAll(filteroptions);
  }

  @Query(() => Blog, { name: 'findOneBlog' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Blog> {
    return this.blogService.findOne(id);
  }


  @Mutation(() => Blog)
  updateBlog(
    @Args('updateBlogInput') updateBlogInput: UpdateBlogInput,
  ): Promise<Blog> {
    return this.blogService.update(
      updateBlogInput.id,
      updateBlogInput,
    );
  }

  @Mutation(() => Blog)
  removeProduct(@Args('id', { type: () => Int }) id: number): Promise<Blog> {
    return this.blogService.remove(id);
  }
}
