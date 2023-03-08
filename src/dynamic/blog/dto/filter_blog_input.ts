import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BlogFilterInput {
  @IsOptional()
  @Field({ nullable: true, defaultValue: 1 })
  page: number;

  @IsOptional()
  @Field({ nullable: true, defaultValue: 10 })
  limit: number;

  @IsOptional()
  @Field({ nullable: true, defaultValue: 'ASC' })
  sort: string;

  @IsOptional()
  @Field({ nullable: true })
  orderBy: string;
}
