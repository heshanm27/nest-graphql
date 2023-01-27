import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDatumInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
