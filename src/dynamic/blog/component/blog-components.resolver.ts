import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BlogComponentsService } from './blog-components.service';
import { BlogComponent } from './entities/blog-components.entity';
import { CreateBlogComponentInput } from './dto/create-component.input';
import { UpdateBlogComponentInput } from './dto/update-component.input';


@Resolver(() => BlogComponent)
export class BlogComponentsResolver {
  constructor(private readonly blogComponentsService: BlogComponentsService) {}

  @Mutation(() => BlogComponent)
  createBlogComponent(
    @Args('createBlogComponentInput') createBlogComponentInput: CreateBlogComponentInput,
  ) {
    return this.blogComponentsService.create(createBlogComponentInput);
  }

  @Query(() => [BlogComponent], { name: 'findAllBlogComponents' })
  findAll(): Promise<BlogComponent[]> {
    return this.blogComponentsService.findAll();
  }

  @Query(() => [BlogComponent], { name: 'findAllBlogComponents' })
  async findAllByCollectionId(
  ): Promise<BlogComponent[]> {
    return await this.blogComponentsService.findBlogComponents();
  }

 // @Query(() => BlogComponent, { collectionName: 'findOneBlogComponent' })
 // findOne(@Args('id', { type: () => Int }) id: number): Promise<BlogComponent> {
 //   return this.blogComponentsService.findOne(id);
 // }

  @Mutation(() => BlogComponent)
  updateBlogComponent(
    @Args('collectionName') collectionName: string,
    @Args('updateBlogComponentInput') updateBlogComponentInput: UpdateBlogComponentInput,
  ) {
    return this.blogComponentsService.update(
      updateBlogComponentInput.id,
      updateBlogComponentInput,
       collectionName,
    );
  }

  @Mutation(() => BlogComponent)
  removeBlogComponent(@Args('id', { type: () => Int }) id: number,    @Args('collectionName') collectionName: string) {
    return this.blogComponentsService.remove(id,collectionName);
  }
}
