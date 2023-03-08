import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class BlogImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  mimetype: string;

  @Column()
  filename: string;

  @ManyToOne(() => Blog, (blog) => blog.images)
  blog: Blog;
}
