import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model.entity';
import * as bcrypt from 'bcrypt';


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
      await this.save(user);  
    }
}