import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './Dto/create_task.dto';
import { GetTasksFilterDto } from './Dto/get-tasks-filter.dto';
import { Task } from './Dto/task.entity';
import { UpdateTaskStatusDto } from './Dto/update-task-status.dto';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]>{
    
      return this.tasksService.getAllTasks(filterDto);
    
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto:CreateTaskDto
  ):Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void>{
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const {status} = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(id,status);
  }
}
