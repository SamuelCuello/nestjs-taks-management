import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './Dto/create_task.dto';
import { GetTasksFilterDto } from './Dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];


  getAllTasks(): Task[]{
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string){
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto:CreateTaskDto): Task{
const {title, description} = createTaskDto

    const task: Task= {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
    }

    deleteTaskById(id: string): string{
      const task: Task = this.tasks.find(task => task.id === id);
      const index: number = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
      return 'Task Deleted'
    }


    updateTaskStatus(id: string, status: TaskStatus):Task{
      const task = this.getTaskById(id);
      task.status= status;
      return task;
    }
}
