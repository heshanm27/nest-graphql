import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
