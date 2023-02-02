import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Blog {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  blogName: string;

  @Column({ unique: true })
  @Field()
  blogCode: string;

  @Column()
  @Field()
  description: string;

  @Column({ default: 0 })
  @Field((type) => Float)
  price: number;

  @Column({ default: 0 })
  @Field((type) => Float)
  starRating: number;

  @Column()
  @Field()
  imageUrl: string;
}
