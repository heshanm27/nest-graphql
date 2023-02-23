import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

//JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //Inject the UserService
  //Pass the options to the PassportStrategy Super Class
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  //Validate the payload
  async validate(validationPayload: { email: string }): Promise<string> {
    try {
      await this.userService.findOneByEmail(validationPayload.email);
      return '';
    } catch (error) {
      throw new Error(error);
    }
  }
}
