import { ObjectType, Field, Int} from '@nestjs/graphql';
import { Collection } from '../../../../collection/entities/collection.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('eventcomponent')
@ObjectType()
export class EventComponent {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  htmlInputType: string;

  @Column()
  @Field()
  dataType: string;

  @Column({
    unique: true,
  })
  @Field()
  name: string;

  @Column()
  @Field({ nullable: true })
  componentId: string;

  @Column()
  @Field({ nullable: true })
  label: string;

}
