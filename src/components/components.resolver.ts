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
import { exec } from 'child_process';
import { runCommand } from 'src/util/command.util';

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

  @Query(() => [Component], { name: 'findAllComponentsByCollectionId' })
  async findAllByCollectionId(
    @Args('collectionID', { type: () => Int }) id: number,
  ): Promise<Component[]> {
    return await this.componentsService.findComponentsByCollectionId(id);
  }

  @Query(() => Component, { name: 'findOnecomponent' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Component> {
    return this.componentsService.findOne(id);
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
