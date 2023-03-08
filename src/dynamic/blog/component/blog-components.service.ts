import { Injectable } from '@nestjs/common';
import { CreateBlogComponentInput } from './dto/create-component.input';
import { UpdateBlogComponentInput } from './dto/update-component.input';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogComponent } from './entities/blog-components.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';
import { exec } from 'child_process';
import { Collection } from 'src/collection/entities/collection.entity';
import { runCommand } from 'src/util/command.util';
import dataSource from 'db/data_source';
@Injectable()
export class BlogComponentsService {
  constructor(
    @InjectRepository(BlogComponent)
    private blogComponentRepository: Repository<BlogComponent>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createBlogComponentInput: CreateBlogComponentInput) {
    try {
      const collection = await this.collectionRepository.findOneBy({
        id: createBlogComponentInput.collectionId,
      });

      if (!collection) throw new BadRequestException('Collection not found');

      const obj = {
        name: createBlogComponentInput.name,
        type: createBlogComponentInput.dataType,
      };

      const jsonObj = JSON.stringify(obj);
      const changedObject = JSON.stringify(jsonObj);

      const product = await this.blogComponentRepository.create({
        componentId: createBlogComponentInput.componentId
          ? createBlogComponentInput.componentId
          : createBlogComponentInput.name,
        label: createBlogComponentInput.label
          ? createBlogComponentInput.label
          : createBlogComponentInput.name,
        ...createBlogComponentInput,
      });
      const savedProduct = await this.blogComponentRepository.save(product);
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

  async findAll(): Promise<BlogComponent[]> {
    return await this.blogComponentRepository.find();
  }

  async findBlogComponents(): Promise<BlogComponent[]> {
    return await this.blogComponentRepository.find();
  }
  async findOne(id: number) {
    const product = await this.blogComponentRepository.findOneBy({ id });
    if (!product)
      throw new BadRequestException(`Product with id ${id} not found`);
    return product;
  }

   async update(
    id: number,
    updateComponentInput: UpdateBlogComponentInput,
    collectionName: string,
  ): Promise<BlogComponent> {
    const foundComponent = await this.blogComponentRepository.findOneBy({
      id,
    });
    if (!foundComponent)
      throw new BadRequestException(`Component with id ${id} not found`);
    await this.blogComponentRepository.update(id, updateComponentInput);
    const { name, dataType } = updateComponentInput;
    const jsonObj = JSON.stringify({ name, type: dataType });
    const changedObject = JSON.stringify(jsonObj);
    console.log(
      `plop updateFiled ${collectionName} ${foundComponent.name} ${changedObject}`,
    );
    await runCommand(
      `plop updateFiled ${collectionName} ${foundComponent.name} ${changedObject}`,
    );
    return await this.blogComponentRepository.findOneBy({ id });
  }


async remove(id: number, collectionName: string): Promise<BlogComponent> {
    const dataSourceConnection = await dataSource.initialize();
    const queryRunner = dataSourceConnection.createQueryRunner();
    try {
      const component = await this.blogComponentRepository.findOneBy({ id });
      if (!component) throw new BadRequestException('Component not found');
      queryRunner.connect();
      queryRunner.dropColumn(collectionName, component.name);
      await runCommand(`plop deleteField ${collectionName} ${component.name}`);
      await this.blogComponentRepository.delete({ id });
      return component;
    } catch (error) {
      throw new BadRequestException(`Component with id ${id} not found`);
    } finally {
      queryRunner.release();
      dataSourceConnection.destroy();
    }
  }
}
