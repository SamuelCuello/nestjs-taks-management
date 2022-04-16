import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthUser } from './dto/auth-user.dto';


@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async createUser(createUsersDto: CreateUserDto): Promise<void> {
      const { fullName, email, password } = createUsersDto
  
      const hashPassword = await bcrypt.hash(password, 10)
  
      const user = this.create({
        fullName,
        email,
        password: hashPassword,
        isActive: true
      })
      try {
        await this.save(user); 
      } catch (error) {
        if (error.code ==='23505')
        {
          throw new ConflictException('Email Already Exist')
        } else{
          throw new InternalServerErrorException();
        }
      }
       
    }

    async singIn(authUser: AuthUser): Promise<string>{
     const {email, password}= authUser;

    const user= await this.findOne({ email })
    
    if (user && (await bcrypt.compare(password, (await user).password))){
      return 'success'
    }

    else{
    throw new UnauthorizedException('Please check your login credentials')
    }
    }
}