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
