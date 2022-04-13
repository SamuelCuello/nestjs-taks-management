import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsersDto } from './DTO/create-user.dto';
import { User } from './model-user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor (private usersService:UsersService){}

  @Get()
  getAllUsers(): User[]{
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getUserById( @Param('id') id: string): User{
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body()createUsersDto: CreateUsersDto): User{
    return this.usersService.createUser(createUsersDto)
  }
}
