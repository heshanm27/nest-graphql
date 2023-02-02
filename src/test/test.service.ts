import { Injectable } from '@nestjs/common';
import { CreateTestInput } from './dto/create-test.input';
import { UpdateTestInput } from './dto/update-test.input';
import { Test } from './entities/test.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/test/abstract_service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestService extends CrudService<Test> {
  constructor(
    @InjectRepository(Test)
    private readonly testRepo: Repository<Test>,
  ) {
    super(testRepo, 'test');
  }
}
