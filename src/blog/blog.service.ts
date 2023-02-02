import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  RequestTimeoutException,
} from '@nestjs/common/exceptions';
import { BlogFilterInput } from './dto/filter_blog_input';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';






@Injectable()
export class BlogService {

    constructor(
    @InjectRepository(Blog)
    private BlogRepository: Repository<Blog>,
  ) {}

async create(createProductInput: CreateBlogInput): Promise<Blog> {
    try {
      const product = await this.BlogRepository.create(createProductInput);
      return await this.BlogRepository.save(product);
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

async findAll(filteroptions: BlogFilterInput): Promise<Blog[]> {
    return await this.BlogRepository
      .createQueryBuilder('product')
      .orderBy(filteroptions.sort)
      .limit(filteroptions.limit)
      .offset(filteroptions.page * filteroptions.limit)
      .getMany();
  }

async findOne(id: number): Promise<Blog> {
    const product = await this.BlogRepository.findOneBy({ id });
    if (!product)
      throw new BadRequestException(`Product with id ${id} not found`);
    return product;
  }

async update(
    id: number,
    updateProductInput: UpdateBlogInput,
  ): Promise<Blog> {
    const foundProduct = await this.BlogRepository.findOneBy({ id });

    if (!foundProduct)
      throw new BadRequestException(`Product with id ${id} not found`);

    await this.BlogRepository.update(id, updateProductInput);
    return await this.BlogRepository.findOneBy({ id });
  }

async remove(id: number): Promise<Blog> {
    try {
      const product = await this.BlogRepository.findOneBy({ id });
      if (!product) throw new BadRequestException('Product not found');
      const deleted = await this.BlogRepository.delete({ id });
      return product;
    } catch (error) {
      throw new BadRequestException(`Blog with id ${id} not found`);
    }
  }

 }