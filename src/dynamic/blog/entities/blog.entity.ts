import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FileUpload } from '../dto/file-upload-dto';
import { BlogImage } from './blog.image.entity';

@Entity()
@ObjectType()
export class Blog {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

  @Field()
  @Column()
  movieno: number;

  @Field()
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  moviedate: String;

  @Field(() => String)
  @OneToMany(() => BlogImage, (blogImage) => blogImage.blog)
  images: BlogImage[];
}
