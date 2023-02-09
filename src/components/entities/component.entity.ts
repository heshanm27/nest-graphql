import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { type } from 'os';
import { Collection } from 'src/collection/entities/collection.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('component')
@ObjectType()
export class Component {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  htmlInputType: string;

  @Column()
  @Field()
  dataType: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field({ nullable: true })
  componentId: string;

  @Column()
  @Field({ nullable: true })
  label: string;

  @Column()
  @Field((type) => Int)
  collectionId: number;

  @ManyToOne(() => Collection, (collection) => collection.id, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Collection)
  collection: Collection;
}
