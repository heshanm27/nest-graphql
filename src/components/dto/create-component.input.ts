import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
  isNumber,
  IsNumber,
} from 'class-validator';

export enum HTMLInputTypes {
  DATE = 'date',
  EMAIL = 'email',
  NUMBER = 'number',
  PASSWORD = 'password',
  TEXT = 'text',
  TIME = 'time',
  FILE = 'file',
  CHECKBOX = 'checkbox',
}

registerEnumType(HTMLInputTypes, {
  name: 'HTMLInputType', // this one is mandatory
  description: 'HTML Input Types ', // this one is optional
});

@InputType()
export class CreateComponentInput {
  @IsNotEmpty()
  @Field(() => HTMLInputTypes, {
    defaultValue: HTMLInputTypes.TEXT,
  })
  type: string;

  @IsString()
  @Field()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Field((type) => Int)
  collectionId: number;

  @IsOptional()
  @Field({ nullable: true })
  componentId: string;

  @IsOptional()
  @Field({ nullable: true })
  label: string;
}
