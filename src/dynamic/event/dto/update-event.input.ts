import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';



@InputType()
export class UpdateEventInput  {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  id: number;


}
