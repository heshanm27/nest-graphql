import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('components')
@ObjectType()
export class Component {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  type: string;

  @Column({ nullable: true })
  @Field()
  name: string;

  @Column({ unique: true })
  @Field({ nullable: true })
  componenId: string;

  @Column()
  @Field({ nullable: true })
  label: string;
}
