
import { Task } from "./task.entity.dto";
import { EntityRepository, Repository } from 'typeorm';



@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{

}