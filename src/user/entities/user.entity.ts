import { ObjectType, Field } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field({ nullable: true })
  firstName: string;

  @Column()
  @Field({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: 'user' })
  @Field({ nullable: true })
  role: string;

  @BeforeInsert()
  emailToLowerCase() {
    console.log('this.email', this.email);
    this.email = this.email.toLowerCase();
  }

  // @BeforeInsert()
  // @BeforeUpdate()
  // hashPassword() {
  //   bcrypt.hash('secreate', 10, function (err, hash) {
  //     console.log('hash', this);
  //     console.log('err', err);
  //     console.log('this.password', this.password);
  //     this.password = hash;
  //   });
  // }
}
