import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { HTMLInputTypes, DataType } from '../../../../util/default-enum.util';


 registerEnumType(HTMLInputTypes, {
   name: 'HTMLInputType', // this one is mandatory
  description: 'HTML Input Types ', // this one is optional
 });
registerEnumType(DataType, {
  name: 'DataType',
  description: 'Data Types ',
});
@InputType()
export class UpdateBlogComponentInput {
  @IsNumber()
  @Field((type) => Int)
  id: number;

  @IsString()
  @IsNotEmpty()
  @Field(() =>DataType, {
    nullable: true,
  })
  dataType: string;

  @IsString()
  @IsNotEmpty()
  @Field(() =>HTMLInputTypes, {
    nullable: true,
  })
  htmlInputType: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  componentId: string;

  @IsOptional()
  @Field({ nullable: true })
  label: string;
}
