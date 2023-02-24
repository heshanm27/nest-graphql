import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LoginUserInput } from 'src/user/dto/login-user.input';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  //check recieved username and password match
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    console.log('user: ', user);
    if (!user) {
      return null;
    }
    const passwordIsValid = user.password === pass;
    console.log('passwordIsValid: ', passwordIsValid);
    return passwordIsValid ? user : null;
  }

  async logIn(user: LoginUserInput): Promise<LoginResponse> {
    const payload = {
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // create new user
  async signUp(userInfo: CreateUserInput): Promise<any> {
    return await this.userService.createUser(userInfo);
  }
}
