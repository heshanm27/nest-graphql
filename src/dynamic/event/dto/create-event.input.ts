import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

@InputType()
export class EventInput {

  @Field({ nullable: true })
  id: number;

}
