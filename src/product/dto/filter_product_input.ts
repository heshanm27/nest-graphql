import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum OrderBy {
  ID = 'id',
  NAME = 'productName',
  CODE = 'productCode',
  PRICE = 'price',
  STAR = 'starRating',
  SUPPLIER = 'suppliersId',
}

registerEnumType(OrderBy, {
  name: 'OrderBy', // this one is mandatory
  description: 'Order By Options', // this one is optional
});

registerEnumType(Sort, {
  name: 'Sort',
  description: 'Sort Options',
});
@InputType()
export class ProductFilterInput {
  @IsOptional()
  @Field({ nullable: true, defaultValue: 1 })
  page: number;

  @IsOptional()
  @Field({ nullable: true, defaultValue: 10 })
  limit: number;

  @IsOptional()
  @Field(() => Sort, { nullable: true, defaultValue: Sort.ASC })
  sort: Sort;

  @IsOptional()
  @Field(() => OrderBy, { nullable: true, defaultValue: OrderBy.ID })
  orderBy: OrderBy;
}
