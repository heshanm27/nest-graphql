import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ComponentsValue } from 'src/components-value/entities/components-value.entity';
import { Component } from 'src/components/entities/component.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('collection')
@ObjectType()
export class Collection {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  collectionName: string;

  @OneToMany(() => Component, (component) => component.collection)
  @Field((type) => [Component])
  components: Component[];

  @OneToMany(
    () => ComponentsValue,
    (componentsValue) => componentsValue.collection,
  )
  @Field((type) => [ComponentsValue])
  componentsValue: ComponentsValue[];
}
