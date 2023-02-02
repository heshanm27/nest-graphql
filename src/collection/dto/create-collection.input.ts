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
  @Matches(/^[a-zA-Z]+$/, { message: 'Collection name must be a string' })
  @MinLength(3)
  @IsNotEmpty()
  @Field()
  collectionName: string;
}
