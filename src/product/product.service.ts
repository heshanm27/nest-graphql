import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  RequestTimeoutException,
} from '@nestjs/common/exceptions';
import { ProductFilterInput } from './dto/filter_product_input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    try {
      const product = await this.productRepository.create(createProductInput);
      return await this.productRepository.save(product);
    } catch (error) {
      console.log(error);
      // if (error.code === 'ER_DUP_ENTRY')
      //   throw new BadRequestException('Product Code already exists');
      throw new RequestTimeoutException();
    }
  }

  async findAll(filteroptions: ProductFilterInput): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .orderBy(filteroptions.orderBy, filteroptions.sort)
      .limit(filteroptions.limit)
      .offset(filteroptions.page)
      .getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new BadRequestException(`Product with id ${id} not found`);
    return product;
  }

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const foundProduct = await this.productRepository.findOneBy({ id });

    if (!foundProduct)
      throw new BadRequestException(`Product with id ${id} not found`);

    await this.productRepository.update(id, updateProductInput);
    return await this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) throw new BadRequestException('Product not found');

      const deleted = await this.productRepository.delete({ id });
      console.log(deleted);
      return product;
    } catch (error) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
  }
}
