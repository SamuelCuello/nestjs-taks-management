import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './Dto/create_task.dto';
import { GetTasksFilterDto } from './Dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './Dto/task.repository';
import { Task } from './Dto/task.entity';
import { User } from 'src/users/model.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) { }

    getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
      return this.tasksRepository.getAllTasks(filterDto, user)
    }


  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user)
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user)
  }

  deleteTaskById(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTaskById(id, user);
  }


  updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, status, user);
  }
}
