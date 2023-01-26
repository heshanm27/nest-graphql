import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ProductFilterInput } from './filter_product_input';

@InputType()
export class ProductSearchInput {
  @IsOptional()
  @Field({ nullable: true, defaultValue: '' })
  productName: string;

  @IsOptional()
  @Field({ nullable: true })
  filterOptions: ProductFilterInput;
}
