import { CreateDatumInput } from './create-datum.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDatumInput extends PartialType(CreateDatumInput) {
  @Field(() => Int)
  id: number;
}
