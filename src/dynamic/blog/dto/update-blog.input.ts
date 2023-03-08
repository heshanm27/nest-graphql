import { IsNotEmpty, IsNumber } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-minimal';
import { FileUpload } from './file-upload-dto';

@InputType()
export class UpdateBlogInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  id: number;

  @Field({ nullable: true })
  movieno: number;

  @Field({ nullable: true })
  moviedate: String;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
