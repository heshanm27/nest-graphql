import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateBlogInput {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Field()
  blogName: string;

  @IsString()
  @MinLength(6)
  @Field()
blogCode: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  price: number;

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  starRating: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  imageUrl: string;

}
