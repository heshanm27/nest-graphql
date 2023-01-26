import { Injectable } from '@nestjs/common';
import { CreateComponentInput } from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
  ) {}

  async create(createComponentInput: CreateComponentInput) {
    try {
      const product = await this.componentRepository.create(
        createComponentInput,
      );
      return await this.componentRepository.save(product);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Component[]> {
    return await this.componentRepository.find();
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
      throw new BadRequestException(`Component with id ${id} not found`);

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
