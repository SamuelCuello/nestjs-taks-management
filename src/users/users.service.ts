import { Injectable } from '@nestjs/common';
import { User } from './model-user';
import { CreateUsersDto } from './DTO/create-user.dto';
import {v4 as uuid} from 'uuid';



@Injectable()
export class UsersService {
  private users: User[]= [];

  getAllUsers(): User[] {
    return this.users
  }

  createUser(createUsersDto: CreateUsersDto): User{
    const {fullName, email, password} = createUsersDto

    // const salt= bcrypt.genSalt(10);
    // const hashPassword = bcrypt.hash(password, salt)

    const user: User ={
      id:uuid(),
      fullName,
      email,
      password,
    }
    this.users.push(user)
    return user
  }
}
