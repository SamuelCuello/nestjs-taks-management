import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUsersDto } from './DTO/create-user.dto';
import { User } from './model-user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor (private usersService:UsersService){}

  @Get()
  getAllUsers(){
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body()createUsersDto: CreateUsersDto): User{
    return this.usersService.createUser(createUsersDto)
  }
}
