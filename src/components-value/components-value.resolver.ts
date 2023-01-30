import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ComponentsValueService } from './components-value.service';
import { ComponentsValue } from './entities/components-value.entity';
import { CreateComponentsValueInput } from './dto/create-components-value.input';
import { UpdateComponentsValueInput } from './dto/update-components-value.input';

@Resolver(() => ComponentsValue)
export class ComponentsValueResolver {
  constructor(
    private readonly componentsValueService: ComponentsValueService,
  ) {}

  @Mutation(() => ComponentsValue)
  createComponentsValue(
    @Args('createComponentsValueInput')
    createComponentsValueInput: CreateComponentsValueInput,
  ) {
    return this.componentsValueService.create(createComponentsValueInput);
  }

  @Query(() => ComponentsValue, { name: 'GetCollectionData' })
  findOneCollectionData(@Args('id', { type: () => Int }) id: number) {
    return this.componentsValueService.findOneCollectionData(id);
  }

  @Mutation(() => ComponentsValue)
  updateComponentsValue(
    @Args('updateComponentsValueInput')
    updateComponentsValueInput: UpdateComponentsValueInput,
  ) {
    return this.componentsValueService.update(
      updateComponentsValueInput.id,
      updateComponentsValueInput,
    );
  }

  @Mutation(() => ComponentsValue)
  removeComponentsValue(@Args('id', { type: () => Int }) id: number) {
    return this.componentsValueService.remove(id);
  }
}
