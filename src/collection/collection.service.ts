import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { Repository } from 'typeorm';
import { runCommand } from '../util/command.util';
import dataSource from 'db/data_source';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createCollectionInput: CreateCollectionInput) {
    try {
      const collection = await this.collectionRepository.create(
        createCollectionInput,
      );

      await Promise.all([
        runCommand(`npm run gen ${createCollectionInput.collectionName}`),
        runCommand(
          `npm run gen:basecom ${createCollectionInput.collectionName}`,
        ),
      ]);

      return await this.collectionRepository.save(collection);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new BadRequestException('Collection already exists ');
      throw new BadRequestException();
    }
  }

  findAll() {
    try {
      return this.collectionRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findOne(id: number) {
    try {
      return this.collectionRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: number, updateCollectionInput: UpdateCollectionInput) {
    const foundComponent = await this.collectionRepository.findOneBy({ id });
    console.log('found component', foundComponent);
    if (!foundComponent)
      throw new BadRequestException(`Collection with id ${id} not found`);

    const dataSourceConnection = await dataSource.initialize();
    const repostory = dataSourceConnection.getRepository(
      foundComponent.collectionName,
    );
    const queryRunner = dataSourceConnection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await repostory.query(
        `ALTER TABLE ${foundComponent.collectionName} RENAME TO ${updateCollectionInput.collectionName}`,
      );
      await repostory.query(
        `ALTER TABLE ${foundComponent.collectionName}component RENAME TO ${updateCollectionInput.collectionName}component`,
      );
      await this.collectionRepository.update(id, updateCollectionInput);
      return await this.collectionRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Collection with id ${id} not found`);
    } finally {
      await queryRunner.release();
      dataSourceConnection.destroy();
    }
  }

  async remove(id: number) {
    try {
      const component = await this.collectionRepository.findOneBy({ id });
      // console.log(component);
      if (!component) throw new BadRequestException('Collection not found');
      await this.collectionRepository.delete({ id });

      const dataSourceConnection = await dataSource.initialize();

      dataSourceConnection
        .getRepository(component.collectionName)
        .query(`DROP TABLE ${component.collectionName}`)
        .catch((error) => {
          console.log(error);
          throw new BadRequestException('Database error');
        })
        .finally(() => {
          dataSourceConnection.destroy();
        });
      await runCommand(`npm run delete:collection ${component.collectionName}`);

      return component;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Collection with id ${id} not found`);
    }
  }
}
