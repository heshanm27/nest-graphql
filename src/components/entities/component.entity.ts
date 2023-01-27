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
  type: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ unique: true })
  @Field({ nullable: true })
  componenId: string;

  @Column()
  @Field({ nullable: true })
  label: string;

  @ManyToOne(() => Collection, (collection) => collection.components)
  @Field((type) => Collection)
  collection: Collection;
}
