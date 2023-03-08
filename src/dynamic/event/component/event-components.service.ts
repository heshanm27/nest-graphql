import { Injectable } from '@nestjs/common';
import { CreateEventComponentInput } from './dto/create-component.input';
import { UpdateEventComponentInput } from './dto/update-component.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EventComponent } from './entities/event-components.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';
import { exec } from 'child_process';
import { Collection } from 'src/collection/entities/collection.entity';
import { runCommand } from 'src/util/command.util';
import dataSource from 'db/data_source';
@Injectable()
export class EventComponentsService {
  constructor(
    @InjectRepository(EventComponent)
    private eventComponentRepository: Repository<EventComponent>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createEventComponentInput: CreateEventComponentInput) {
    try {
      const collection = await this.collectionRepository.findOneBy({
        id: createEventComponentInput.collectionId,
      });

      if (!collection) throw new BadRequestException('Collection not found');

      const obj = {
        name: createEventComponentInput.name,
        type: createEventComponentInput.dataType,
      };

      const jsonObj = JSON.stringify(obj);
      const changedObject = JSON.stringify(jsonObj);

      const product = await this.eventComponentRepository.create({
        componentId: createEventComponentInput.componentId
          ? createEventComponentInput.componentId
          : createEventComponentInput.name,
        label: createEventComponentInput.label
          ? createEventComponentInput.label
          : createEventComponentInput.name,
        ...createEventComponentInput,
      });
      const savedProduct = await this.eventComponentRepository.save(product);
      console.log(
        `npm run gen:component ${collection.collectionName} ${changedObject}`,
      );
      await runCommand(
        `npm run gen:component ${collection.collectionName} ${changedObject}`,
      );

      return savedProduct;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new BadRequestException(
          'Component already exists with this name',
        );

      if (error.code === 'ER_NO_REFERENCED_ROW_2')
        throw new BadRequestException('Collection not found');
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<EventComponent[]> {
    return await this.eventComponentRepository.find();
  }

  async findEventComponents(): Promise<EventComponent[]> {
    return await this.eventComponentRepository.find();
  }
  async findOne(id: number) {
    const product = await this.eventComponentRepository.findOneBy({ id });
    if (!product)
      throw new BadRequestException(`Product with id ${id} not found`);
    return product;
  }

   async update(
    id: number,
    updateComponentInput: UpdateEventComponentInput,
    collectionName: string,
  ): Promise<EventComponent> {
    const foundComponent = await this.eventComponentRepository.findOneBy({
      id,
    });
    if (!foundComponent)
      throw new BadRequestException(`Component with id ${id} not found`);
    await this.eventComponentRepository.update(id, updateComponentInput);
    const { name, dataType } = updateComponentInput;
    const jsonObj = JSON.stringify({ name, type: dataType });
    const changedObject = JSON.stringify(jsonObj);
    console.log(
      `plop updateFiled ${collectionName} ${foundComponent.name} ${changedObject}`,
    );
    await runCommand(
      `plop updateFiled ${collectionName} ${foundComponent.name} ${changedObject}`,
    );
    return await this.eventComponentRepository.findOneBy({ id });
  }


async remove(id: number, collectionName: string): Promise<EventComponent> {
    const dataSourceConnection = await dataSource.initialize();
    const queryRunner = dataSourceConnection.createQueryRunner();
    try {
      const component = await this.eventComponentRepository.findOneBy({ id });
      if (!component) throw new BadRequestException('Component not found');
      queryRunner.connect();
      queryRunner.dropColumn(collectionName, component.name);
      await runCommand(`plop deleteField ${collectionName} ${component.name}`);
      await this.eventComponentRepository.delete({ id });
      return component;
    } catch (error) {
      throw new BadRequestException(`Component with id ${id} not found`);
    } finally {
      queryRunner.release();
      dataSourceConnection.destroy();
    }
  }
}
