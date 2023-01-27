import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Component } from 'src/components/entities/component.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('collection')
@ObjectType()
export class Collection {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  displayName: string;

  @OneToMany(() => Component, (component) => component.collection, {
    cascade: true,
  })
  @Field((type) => [Component])
  components: Component[];
}