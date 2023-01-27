import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
  IsNumber,
} from 'class-validator';
import { HTMLInputTypes } from './create-component.input';

registerEnumType(HTMLInputTypes, {
  name: 'HTMLInputType', // this one is mandatory
  description: 'HTML Input Types ', // this one is optional
});

@InputType()
export class UpdateComponentInput {
  @IsNumber()
  @Field((type) => Int)
  id: number;

  @IsNumber()
  @Field((type) => Int)
  collectionId: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => HTMLInputTypes, {
    nullable: true,
    defaultValue: HTMLInputTypes.TEXT,
  })
  type: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  componenId: string;

  @IsOptional()
  @Field({ nullable: true })
  label: string;
}
