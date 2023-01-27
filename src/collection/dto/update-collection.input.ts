import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';
@InputType()
export class UpdateCollectionInput {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  collectionName: string;
}
