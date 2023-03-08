import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
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
export class CreateBlogComponentInput {
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
