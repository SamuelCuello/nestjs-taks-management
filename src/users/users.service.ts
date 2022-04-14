import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model-user';
import { CreateUserDto } from './dtos/create-user.dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from './dtos/response.dto';
import { UserMapper } from './mapper/user.mapper';




@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): ResponseDto[] {
    const response = this.users.map(UserMapper.toDtos)
    return response
  }

  getUserById(id: string): ResponseDto {
    const user: User = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }
    const response = UserMapper.toDto(user)
    
    return response;
  }

  async createUser(createUsersDto: CreateUserDto): Promise<ResponseDto> {
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

    const response = UserMapper.toDto(user)

   
    return response
  }
}
