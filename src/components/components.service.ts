import { Injectable } from '@nestjs/common';
import {
  CreateComponentInput,
  HTMLInputTypes,
} from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';
import { exec } from 'child_process';
import { Collection } from 'src/collection/entities/collection.entity';
import { runCommand } from 'src/util/command.util';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createComponentInput: CreateComponentInput) {
    try {
      const collection = await this.collectionRepository.findOneBy({
        id: createComponentInput.collectionId,
      });

      if (!collection) throw new BadRequestException('Collection not found');
      console.log('collection', collection);

      // exec(
      //   `plop --plopfile plopfile.mjs testObject --data "{\"results\":" + ${JSON.stringify(
      //     testObject,
      //   )} + "}"`,
      //   (err, stdout, stderr) => {
      //     if (err) {
      //       console.error(err);
      //       return;
      //     }
      //     return true;
      //   },
      // );

      const product = await this.componentRepository.create({
        componentId: createComponentInput.componentId
          ? createComponentInput.componentId
          : createComponentInput.name,
        label: createComponentInput.label
          ? createComponentInput.label
          : createComponentInput.name,
        ...createComponentInput,
      });
      const savedProduct = await this.componentRepository.save(product);
      await runCommand(
        `plop --plopfile plopfile.mjs  addComponent ${collection.collectionName} {${savedProduct.name},${savedProduct.type}}`,
      );
      console.log('savedProduct', savedProduct);
      return savedProduct;
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY')
        throw new BadRequestException(
          'Component already exists with this name',
        );

      if (error.code === 'ER_NO_REFERENCED_ROW_2')
        throw new BadRequestException('Collection not found');
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Component[]> {
    return await this.componentRepository.find();
  }

  //  findComponentTypes():HTMLInputTypes{
  //   return
  // }

  async findComponentsByCollectionId(id: number): Promise<Component[]> {
    return await this.componentRepository
      .createQueryBuilder('component')
      .where('component.collectionId = :id', { id })
      .getMany();
  }
  async findOne(id: number) {
    const product = await this.componentRepository.findOneBy({ id });
    if (!product)
      throw new BadRequestException(`Product with id ${id} not found`);
    return product;
  }

  async update(
    id: number,
    updateComponentInput: UpdateComponentInput,
  ): Promise<Component> {
    const foundComponent = await this.componentRepository.findOneBy({ id });

    if (!foundComponent)
      throw new BadRequestException(`Component with id ${id} not foundy`);

    await this.componentRepository.update(id, updateComponentInput);
    return await this.componentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Component> {
    try {
      const component = await this.componentRepository.findOneBy({ id });
      if (!component) throw new BadRequestException('Product not found');
      const deleted = await this.componentRepository.delete({ id });
      console.log(deleted);
      return component;
    } catch (error) {
      throw new BadRequestException(`Component with id ${id} not found`);
    }
  }
}
