import { IsEmail, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;

  @IsString()
  @Field({ nullable: true })
  firstName: string;

  @IsString()
  @Field({ nullable: true })
  lastName: string;

  @IsEmail()
  @Field({ nullable: true })
  email: string;
}
