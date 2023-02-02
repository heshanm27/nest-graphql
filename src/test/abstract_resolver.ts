import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CrudService } from './abstract_service';
import { Injectable, Global } from '@nestjs/common';
import { exec } from 'child_process';
@Global()
@Injectable()
export abstract class CrudResolver<T> {
  constructor(private readonly service: CrudService<T>) {}

  // @Query((returns) => [])
  // async findAll(filteroptions: AbstractFilterDto): Promise<T[]> {
  //   return this.service.findAll(filteroptions);
  // }

  @Query((returns) => [])
  async findOne(@Args('id') id: string): Promise<T> {
    return this.service.findOneById(id);
  }

  // @Mutation((returns) => T)
  // async create(@Args('input') input: T): Promise<T> {
  //   return this.service.create(input);
  // }

  // @Mutation((returns) => T)
  // async update(@Args('id') id: string, @Args('input') input: T): Promise<T> {
  //   return this.service.update(id, input);
  // }

  // @Mutation((returns) => T)
  // async delete(@Args('id') id: string): Promise<T> {
  //   return this.service.delete(id);
  // }
}
