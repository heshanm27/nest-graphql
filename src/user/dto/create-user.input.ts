import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
