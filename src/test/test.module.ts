import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestResolver } from './test.resolver';
import { CrudService } from './abstract_service';
import { CrudResolver } from './abstract_resolver';
import { Test } from './entities/test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  providers: [
    { provide: CrudService, useClass: TestService },
    { provide: CrudResolver, useClass: TestResolver },
  ],
})
export class TestModule {}
