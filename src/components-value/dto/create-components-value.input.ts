import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateComponentsValueInput {
  @IsNotEmpty()
  @Field(() => GraphQLJSON)
  data: any;

  @IsNotEmpty()
  @Field(() => Int)
  collectionId: number;
}
