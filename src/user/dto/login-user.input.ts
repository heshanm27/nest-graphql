import { IsEmail, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput extends PartialType(CreateUserInput) {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
