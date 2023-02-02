import { Entity } from 'typeorm';
import { Module, DynamicModule } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';

@Module({})
export class MyModule {
  static entityName = '';
  static forRoot(name: string): DynamicModule {
    console.log('MyModule', name);
    MyModule.entityName = name;

    return {
      module: MyModule,
      imports: [TypeOrmModule.forFeature([Entity])],
      providers: [MyService, MyResolver],
    };
  }
}

@Entity({ name: `${MyModule.entityName}` })
export class Entityx {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Injectable()
export class MyService {
  constructor(
    @InjectRepository(Entityx)
    private readonly entityRepository: Repository<Entityx>,
  ) {
    console.log('MyService', MyModule.entityName);
  }

  async create(entity: Entityx) {
    return this.entityRepository.save(entity);
  }

  async findAll(): Promise<Entityx[]> {
    return this.entityRepository.find();
  }

  async findOne(id: number): Promise<Entityx> {
    return this.entityRepository.findOneBy({ id });
  }

  async update(id: number, entity: Entityx): Promise<void> {
    await this.entityRepository.update(id, entity);
  }

  async remove(id: number): Promise<void> {
    await this.entityRepository.delete(id);
  }
}
@Injectable()
@Resolver((of) => Entityx)
export class MyResolver {
  constructor(
    @InjectRepository(Entityx)
    private readonly entityRepository: Repository<Entityx>,
  ) {
    console.log('MyResolver', MyModule.entityName);
  }

  @Query((returns) => [Entityx])
  async entities() {
    return this.entityRepository.find();
  }

  @Query((returns) => Entityx)
  async entity(@Args('id') id: number) {
    return this.entityRepository.findOneBy({ id });
  }

  @Mutation((returns) => Entityx)
  async createEntity(@Args('input') input: Entityx) {
    return this.entityRepository.save(input);
  }

  @Mutation((returns) => Entityx)
  async updateEntity(@Args('id') id: number, @Args('input') input: Entityx) {
    await this.entityRepository.update(id, input);
    return this.entityRepository.findOneBy({ id });
  }

  @Mutation((returns) => Boolean)
  async deleteEntity(@Args('id') id: number) {
    await this.entityRepository.delete(id);
    return true;
  }
}
