import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseDto } from './dto/response.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor (private usersService:UsersService){}

  // @Get()
  // getAllUsers(): ResponseDto[] {
  //   return this.usersService.getAllUsers();
  // }

  // @Get('/:id')
  // getUserById( @Param('id') id: string): ResponseDto{
  //   return this.usersService.getUserById(id);
  // }

  @Post('/singup')
  async createUser(@Body()createUsersDto: CreateUserDto): Promise<void>{
    return this.usersService.singUp(createUsersDto)
  }
}
