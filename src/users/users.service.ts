import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseDto } from './dto/response.dto';
import { UserMapper } from './mapper/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';





@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ){}

  async singUp(createUserDto: CreateUserDto): Promise<void>{
    return this.userRepository.createUser(createUserDto)
  }
}
