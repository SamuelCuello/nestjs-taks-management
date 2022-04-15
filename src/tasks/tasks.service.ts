import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './Dto/create_task.dto';
import { GetTasksFilterDto } from './Dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './Dto/task.repository';
import { Task } from './Dto/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) { }

  //   getAllTasks(): Task[]{
  //     return this.tasks;
  //   }

  //   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;

  //     let tasks = this.getAllTasks();

  //     // do something with status
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }

  //     if (search) {
  //       tasks = tasks.filter((task) => {
  //         if (task.title.includes(search) || task.description.includes(search)) {
  //           return true;
  //         }

  //         return false;
  //       });
  //     }

  //     return tasks;
  //   }

  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(id)
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto)
  }

  deleteTaskById(id: string): Promise<void>{
    return this.tasksRepository.deleteTaskById(id);
  }


      updateTaskStatus(id: string, status: TaskStatus):Promise<Task>{  
        return this.tasksRepository.updateTaskStatus(id,status);
      }
}
