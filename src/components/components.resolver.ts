import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ComponentsService } from './components.service';
import { Component } from './entities/component.entity';
import { CreateComponentInput } from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { Plop } from 'plop';
import { exec } from 'child_process';
@Resolver(() => Component)
export class ComponentsResolver {
  constructor(private readonly componentsService: ComponentsService) {}

  @Mutation(() => Component)
  createComponent(
    @Args('createComponentInput') createComponentInput: CreateComponentInput,
  ) {
    return this.componentsService.create(createComponentInput);
  }

  @Query(() => [Component], { name: 'findAllComponents' })
  findAll(): Promise<Component[]> {
    return this.componentsService.findAll();
  }

  @Query(() => Component, { name: 'findOnecomponent' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Component> {
    return this.componentsService.findOne(id);
  }

  @Query(() => Boolean, { name: 'dynamiComponentCollection' })
  async findComponentsByCollection(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    const collection =
      await this.componentsService.findComponentsByCollectionId(id);

    exec(
      `plop --plopfile plopfile.mjs test blog ${JSON.stringify(collection)} `,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        return true;
      },
    );

    return true;
  }
  @Mutation(() => Component)
  updateComponent(
    @Args('updateComponentInput') updateComponentInput: UpdateComponentInput,
  ) {
    return this.componentsService.update(
      updateComponentInput.id,
      updateComponentInput,
    );
  }

  @Mutation(() => Component)
  removeComponent(@Args('id', { type: () => Int }) id: number) {
    return this.componentsService.remove(id);
  }
}
