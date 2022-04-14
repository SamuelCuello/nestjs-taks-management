import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model-user';
import { CreateUsersDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from './dto/response.dto';
// import { User } from '../../dist/users/model-user';
import { response } from 'express';



@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): ResponseDto[] {
    const response = this.users.map((user: User): ResponseDto => {
      const { id, fullName, email, isActive } = user

      const response: ResponseDto = {
        id,
        fullName,
        email,
        isActive
      }
      return response

    })
    return response

  }

  getUserById(id: string): ResponseDto {
    const user: User = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }
    const { fullName, email, isActive } = user

    const response: ResponseDto = {
      id: user.id,
      fullName,
      email,
      isActive
    }

    return response;
  }

  async createUser(createUsersDto: CreateUsersDto): Promise<ResponseDto> {
    const { fullName, email, password } = createUsersDto

    console.log(bcrypt);
    const hashPassword = await bcrypt.hash(password, 10)

    const user: User = {
      id: uuid(),
      fullName,
      email,
      password: hashPassword,
      isActive: true
    }
    this.users.push(user)

    const response: ResponseDto = {
      id: user.id,
      fullName,
      email,
      isActive: user.isActive
    }

    return response
  }
}
