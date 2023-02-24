import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Actions,
  CaslPermission,
} from 'src/auth/casl/casl-ability.factory/casl-ability.factory';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class UserService {
  constructor(
    private readonly caslPermission: CaslPermission,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async createUser(userDetails: CreateUserInput): Promise<User> {
    try {
      const user = await this.usersRepository.create({
        ...userDetails,
      });
      const savedUser = await this.usersRepository.save(user);
      return savedUser;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('User already exists with this email');
      }
      throw error;
    }
  }

  async updateUser(id: string, userDetails: UpdateUserInput): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const ability = this.caslPermission.defineAbility(user);
      ForbiddenError.from(ability).throwUnlessCan(Actions.Update, user);

      // Update user details
      await this.usersRepository.update(id, userDetails);
      // Return updated user
      const updatedUser = await this.usersRepository.findOneBy({ id });
      // Return updated user
      return updatedUser;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException('You are not allowed to do this');
      }

      throw error;
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new BadRequestException('User not found');
      }
      // Check if the user is allowed to delete the User
      const ability = this.caslPermission.defineAbility(user);
      ForbiddenError.from(ability).throwUnlessCan(Actions.Delete, user);
      // Delete the user
      await this.usersRepository.delete(id);
      // Return the deleted user
      return user;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException('You are not allowed to do this');
      }
      throw new BadRequestException(error.message);
    }
  }
}
