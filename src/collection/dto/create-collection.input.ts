import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
@InputType()
export class CreateCollectionInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  collectionName: string;
}
