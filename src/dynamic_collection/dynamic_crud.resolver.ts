import { Inject, Provider, Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MyService } from './dynamic_crud.service';

export const createResolver = (entity: any): Provider => {
  @Resolver((of) => entity)
  class DynamicResolver {
    constructor(@Inject(MyService) private readonly service: MyService) {}

    @Mutation((returns) => entity)
    async createEntity(@Args('input') input: any): Promise<any> {
      return this.service.create(input);
    }
  }

  return {
    provide: `${entity.name}Resolver`,
    useClass: DynamicResolver,
  };
};
