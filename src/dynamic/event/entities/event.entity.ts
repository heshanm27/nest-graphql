import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

}
