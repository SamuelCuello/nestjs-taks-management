import { EntityRepository, Repository } from 'typeorm';
import { User } from './model.entity';


@EntityRepository(User)
export class UserRepository extends Repository<User>{

}