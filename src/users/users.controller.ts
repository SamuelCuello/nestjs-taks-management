import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthUser } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseDto } from './dto/response.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor (private usersService:UsersService){}

  @Post('/singup')
  async singUp(@Body()createUsersDto: CreateUserDto): Promise<void>{
    return this.usersService.singUp(createUsersDto)
  }

  @Post('/singin')
  async singIn(@Body()authUser: AuthUser): Promise<string>{
    return this.usersService.singIn(authUser)
  }
}
