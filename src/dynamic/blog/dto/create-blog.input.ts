import { InputType, Field } from '@nestjs/graphql';

// @ts-ignore
import { GraphQLUpload } from 'graphql-upload-minimal';
import { FileUpload } from './file-upload-dto';

@InputType()
export class BlogInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  movieno: number;

  @Field({ nullable: true })
  moviedate: String;

  @Field(() => [GraphQLUpload])
  images: [Promise<FileUpload>];
}
