import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumberString,
  validate,
  Matches,
} from 'class-validator';
@InputType()
export class CreateCollectionInput {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @Field()
  collectionName: string;
}
