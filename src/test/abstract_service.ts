import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Injectable, Global } from '@nestjs/common';

@Global()
@Injectable()
export abstract class CrudService<T> {
  private tableName: string;
  constructor(private readonly repository: Repository<T>, tableName: string) {
    this.tableName = tableName;
  }

  // async findAll(filteroptions: AbstractFilterDto): Promise<T[]> {
  //   return await this.repository
  //     .createQueryBuilder(this.tableName)
  //     .orderBy(filteroptions.sort)
  //     .limit(filteroptions.limit)
  //     .offset(filteroptions.page * filteroptions.limit)
  //     .getMany();
  // }

  async findOneById(id: string): Promise<T> | null {
    return this.repository
      .createQueryBuilder(this.tableName)
      .where({ id })
      .getOne();
  }

  async create(entity: T): Promise<T> {
    try {
      const newObj = await this.repository.create(entity);
      return await this.repository.save(newObj);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(id: string | number, entity: T): Promise<T> {
    try {
      const foundValue = await this.repository
        .createQueryBuilder(this.tableName)
        .where({ id })
        .getOne();
      if (!foundValue) throw new BadRequestException('Not found');
      await this.repository.update(id, entity as any);
      return await this.repository
        .createQueryBuilder(this.tableName)
        .where({ id })
        .getOne();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async delete(id: string): Promise<T> {
    try {
      const foundValue = await this.repository
        .createQueryBuilder(this.tableName)
        .where({ id })
        .getOne();
      if (!foundValue) throw new BadRequestException('Not found');
      await this.repository.delete(id);
      return foundValue;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
