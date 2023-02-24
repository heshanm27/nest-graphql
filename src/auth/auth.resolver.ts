import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LocalAuthGuard } from './guard/local.guard';
import { LoginResponse } from './dto/login-response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse, { name: 'login' })
  async logIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.authService.logIn({ email, password });
  }

  @Mutation(() => LoginResponse, { name: 'signUp' })
  async register(@Args('signupdata') createUserInput: CreateUserInput) {
    const user = await this.authService.signUp(createUserInput);
    return await this.authService.logIn(user);
  }
}
