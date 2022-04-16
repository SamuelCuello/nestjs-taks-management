import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthUser } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';





@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtservise: JwtService
  ){}

  async singUp(createUserDto: CreateUserDto): Promise<void>{
    return this.userRepository.createUser(createUserDto)
  }

  async singIn(authUser: AuthUser): Promise<{accessToken: string}>{
    const {email, password}= authUser;

   const user= await this.userRepository.findOne({ email })
   
   if (user && (await bcrypt.compare(password,  user.password))){
     const payload: JwtPayload= {email};
     const accessToken: string = this.jwtservise.sign(payload) 
     return {accessToken}
   }

   else{
   throw new UnauthorizedException('Please check your login credentials')
   }
   }
}
