import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;
  @Field()
  userRole: string;
  @Field()
  userName: string;
}
