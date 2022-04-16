
import { Task } from "./task.entity";
import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from "../tasks-status.enum";
import { CreateTaskDto } from "./create_task.dto";
import { NotFoundException } from "@nestjs/common";
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { User } from "src/users/model.entity";



@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task)

    return task;
  }

  async getTaskById(id: string): Promise<Task> {

    const found = await this.findOne(id)

    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);

    }
    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus):Promise<Task>{
    const task = await this.getTaskById(id);
    task.status= status;

    await this.save(task)
    return task;
  }

  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    const {status, search} = filterDto
    const query= this.createQueryBuilder('task')

    if (status){
      query.andWhere(
        `task.status = :status`,
        {status}
      );
    }

    if(search){
      query.andWhere(
        `LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)`,
        {search: `%${search}%`}
      );
    }

    const tasks= await query.getMany();
    return tasks;
  }
}