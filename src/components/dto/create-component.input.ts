import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

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

export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'Date',
}

registerEnumType(HTMLInputTypes, {
  name: 'HTMLInputType', // this one is mandatory
  description: 'HTML Input Types ', // this one is optional
});

registerEnumType(DataType, {
  name: 'DataType', // this one is mandatory
  description: 'Data Types ', // this one is optional
});
@InputType()
export class CreateComponentInput {
  @IsNotEmpty()
  @Field(() => HTMLInputTypes, {
    defaultValue: HTMLInputTypes.TEXT,
  })
  htmlInputType: string;

  @IsNotEmpty()
  @Field(() => DataType, {
    defaultValue: DataType.STRING,
  })
  dataType: string;

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
