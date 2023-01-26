import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  @Field(() => HTMLInputTypes, {
    nullable: true,
    defaultValue: HTMLInputTypes.TEXT,
  })
  type: string;

  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @Field()
  componenId: string;

  @IsOptional()
  @Field()
  label: string;
}
