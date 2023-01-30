import { IsNotEmpty, IsOptional } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateComponentsValueInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @Field(() => GraphQLJSON)
  data: any;

  @IsNotEmpty()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  collectionId: number;
}
