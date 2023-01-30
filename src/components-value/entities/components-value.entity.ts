import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Collection } from 'src/collection/entities/collection.entity';
import { Component } from 'src/components/entities/component.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import GraphQLJSON from 'graphql-type-json';

@Entity('components_value')
@ObjectType()
export class ComponentsValue {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

  @Column('simple-json')
  @Field(() => GraphQLJSON)
  data: any;

  @Column()
  @Field((type) => Int)
  collectionId: number;

  @ManyToOne(() => Collection, (collection) => collection.id, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Collection)
  collection: Collection;
}
