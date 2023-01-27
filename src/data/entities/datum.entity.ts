import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Data')
@ObjectType()
export class Datum {
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
}
