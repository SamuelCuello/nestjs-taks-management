import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ResponseDto } from './dtos/response.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor (private usersService:UsersService){}

  @Get()
  getAllUsers(): ResponseDto[] {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getUserById( @Param('id') id: string): ResponseDto{
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body()createUsersDto: CreateUserDto): Promise<ResponseDto>{
    return this.usersService.createUser(createUsersDto)
  }
}
