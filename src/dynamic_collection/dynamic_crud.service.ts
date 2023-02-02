import { Inject, Injectable, Provider } from '@nestjs/common';
import { Column, Entity, EntityRepository, Repository } from 'typeorm';

@Injectable()
export class MyService {
  constructor(
    @Inject('EntityRepositoryToken')
    private readonly entityRepository: Repository<any>,
  ) {}

  async create(entity: any): Promise<any> {
    return this.entityRepository.save(entity);
  }

  async findAll(): Promise<any[]> {
    return this.entityRepository.find();
  }
  findOne(id: number) {
    return `This action returns a #${id} dynamic`;
  }

  update(id: number) {
    return `This action updates a #${id} dynamic`;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamic`;
  }
}

export const createService = (entity: any): Provider => {
  return {
    provide: MyService,
    useClass: MyService,
  };
};

export const createRepository = (entity: any): Provider => {
  return {
    provide: 'EntityRepositoryToken',
    useFactory: (connection) => connection.getRepository(entity),
    inject: ['TypeORMInstance'],
  };
};
