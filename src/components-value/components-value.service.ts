import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateComponentsValueInput } from './dto/create-components-value.input';
import { UpdateComponentsValueInput } from './dto/update-components-value.input';
import { Repository } from 'typeorm';
import { ComponentsValue } from './entities/components-value.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ComponentsValueService {
  constructor(
    @InjectRepository(ComponentsValue)
    private readonly componentsValueRepository: Repository<ComponentsValue>,
  ) {}

  create(createComponentsValueInput: CreateComponentsValueInput) {
    const componentsValue = this.componentsValueRepository.create(
      createComponentsValueInput,
    );
    console.log(componentsValue);
    return this.componentsValueRepository.save(componentsValue);
  }

  findOneCollectionData(id: number) {
    return this.componentsValueRepository.findOneBy({ collectionId: id });
  }

  async update(
    id: number,
    updateComponentsValueInput: UpdateComponentsValueInput,
  ) {
    const foundCollectionData = await this.componentsValueRepository.findOneBy({
      id,
    });

    if (!foundCollectionData)
      throw new BadRequestException(`Collection data with id ${id} not found`);

    let exisitingJsonData = foundCollectionData.data;
    exisitingJsonData = {
      ...exisitingJsonData,
      ...updateComponentsValueInput.data,
    };
    await this.componentsValueRepository
      .createQueryBuilder()
      .update(ComponentsValue)
      .set({
        data: exisitingJsonData,
        collectionId: updateComponentsValueInput.collectionId,
      })
      .where({ id })
      .execute();
    const updatedCollectionData =
      await this.componentsValueRepository.findOneBy({
        id,
      });

    console.log(updatedCollectionData);
    return updatedCollectionData;
  }

  remove(id: number) {
    return `This action removes a #${id} componentsValue`;
  }
}
