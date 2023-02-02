import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestService } from './test.service';
import { Test } from './entities/test.entity';
import { CrudResolver } from 'src/test/abstract_resolver';
import { CrudService } from 'src/test/abstract_service';

@Resolver(() => Test)
export class TestResolver extends CrudResolver<Test> {
  constructor(protected readonly testService: TestService) {
    super(testService);
  }
}
