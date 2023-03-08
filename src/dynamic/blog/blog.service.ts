import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  RequestTimeoutException,
} from '@nestjs/common/exceptions';
import { BlogFilterInput } from './dto/filter_blog_input';
import { BlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { BlogImage } from './entities/blog.image.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private BlogRepository: Repository<Blog>,
    @InjectRepository(BlogImage)
    private BlogImageRepository: Repository<BlogImage>,
  ) {}

  async create(blogInput: BlogInput): Promise<Blog> {
    const filenames = [];
    console.log('blogInput', blogInput);
    try {
      for (let img of blogInput.images) {
        const { createReadStream, filename } = await img;
        console.log('default img', img);
        filenames.push({
          filename: filename,
          url: 'http://localhost:3000/blog/upload/' + filename,
          mimetype: (await img).mimetype,
        });
        createReadStream()
          .pipe(
            createWriteStream(
              join(process.cwd(), `./src/dynamic/blog/upload/${filename}`),
            ),
          )
          .on('close', () => console.log('File uploaded successfully'));
      }

      // const { createReadStream, filename } = await blogInput.image[0];

      // createReadStream()
      //   .pipe(
      //     createWriteStream(
      //       join(process.cwd(), `./src/dynamic/blog/upload/${filename}`),
      //     ),
      //   )
      //   .on('close', () => console.log('File uploaded successfully'));

      // console.log('blogInput', blogInput);
      // console.log('filename', filename);
      // const blog = await this.BlogRepository.create({
      //   movieno: blogInput.movieno,
      //   moviedate: blogInput.moviedate,
      //   image: 'http://localhost:3000/blog/upload/' + filename,
      // });
      // console.log('new blog', blog);
      // return await this.BlogRepository.save(blog);
      const blog = await this.BlogRepository.create({
        movieno: blogInput.movieno,
        moviedate: blogInput.moviedate,
      });
      const savedBlog = await this.BlogRepository.save(blog);
      console.log('blog', savedBlog.id);
      for (let data of filenames) {
        const blogImg = await this.BlogImageRepository.create({
          filename: data.filename,
          url: data.url,
          mimetype: data.mimetype,
          blog: savedBlog,
        });
        await this.BlogImageRepository.save(blogImg);
      }

      return {
        id: 1,
        movieno: 1,
        moviedate: '2020-01-01',
        images: [
          {
            id: 1,
            filename: 'test.jpg',
            url: 'http://localhost:3000/blog/upload/test.jpg',
            mimetype: 'image/jpeg',
            blog: {
              id: 1,
              movieno: 1,
              images: [],
              moviedate: '2020-01-01',
            },
          },
        ],
      };
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

  async findAll(filteroptions: BlogFilterInput): Promise<Blog[]> {
    const defaultFilterValue = {
      orderBy: filteroptions.orderBy || 'id',
      sort: 'ASC',
      limit: filteroptions.page || 10,
      page: filteroptions.limit || 0,
    };
    return await this.BlogRepository.createQueryBuilder('blog')
      .orderBy(defaultFilterValue.orderBy, 'ASC')
      .limit(defaultFilterValue.limit)
      .offset(defaultFilterValue.page * defaultFilterValue.limit)
      .getMany();
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.BlogRepository.findOneBy({ id });
    if (!blog) throw new BadRequestException(`blog with id ${id} not found`);
    return blog;
  }

  async update(id: number, BlogInput: UpdateBlogInput): Promise<Blog> {
    const foundProduct = await this.BlogRepository.findOneBy({ id });

    if (!foundProduct)
      throw new BadRequestException(`Blog with id ${id} not found`);

    // await this.BlogRepository.update(id, BlogInput);
    return await this.BlogRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Blog> {
    try {
      const blog = await this.BlogRepository.findOneBy({ id });
      if (!blog) throw new BadRequestException('Product not found');
      const deleted = await this.BlogRepository.delete({ id });
      return blog;
    } catch (error) {
      throw new BadRequestException(`Blog with id ${id} not found`);
    }
  }
}
