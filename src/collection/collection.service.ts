import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { ConnectionManager, Repository } from 'typeorm';
import { runCommand } from 'src/util/command.util';
import dataSource from 'db/data_source';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createCollectionInput: CreateCollectionInput) {
    try {
      console.log(createCollectionInput);
      const collection = await this.collectionRepository.create(
        createCollectionInput,
      );
      const commandResult = await runCommand(
        `npm run gen ${createCollectionInput.collectionName}`,
      );
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

    if (!foundComponent)
      throw new BadRequestException(`Collection with id ${id} not found`);

    await this.collectionRepository.update(id, updateCollectionInput);
    return await this.collectionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    try {
      const component = await this.collectionRepository.findOneBy({ id });
      // console.log(component);
      if (!component) throw new BadRequestException('Collection not found');
      const deleted = await this.collectionRepository.delete({ id });

      await runCommand(`npm run delete:collection ${component.collectionName}`);
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

      return component;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Collection with id ${id} not found`);
    }
  }
}
