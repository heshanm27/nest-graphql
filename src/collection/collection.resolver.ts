import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { Collection } from './entities/collection.entity';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { ComponentsService } from 'src/components/components.service';
import { Component } from 'src/components/entities/component.entity';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly componentsService: ComponentsService,
  ) {}

  @Mutation(() => Collection)
  createCollection(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.collectionService.create(createCollectionInput);
  }

  @Query(() => [Collection], { name: 'FindAllCollection' })
  findAll() {
    return this.collectionService.findAll();
  }

  @Query(() => Collection, { name: 'collectionFindOne' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.collectionService.findOne(id);
  }

  @ResolveField(() => [Component])
  async components(@Parent() collection: Collection): Promise<Component[]> {
    return await this.componentsService.findComponentsByCollectionId(
      collection.id,
    );
  }

  @Mutation(() => Collection)
  updateCollection(
    @Args('updateCollectionInput') updateCollectionInput: UpdateCollectionInput,
  ) {
    return this.collectionService.update(
      updateCollectionInput.id,
      updateCollectionInput,
    );
  }

  @Mutation(() => Collection)
  removeCollection(@Args('id', { type: () => Int }) id: number) {
    return this.collectionService.remove(id);
  }
}
