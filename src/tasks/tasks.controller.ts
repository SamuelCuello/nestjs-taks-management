import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-users.decorator';
import { CreateTaskDto } from './Dto/create_task.dto';
import { GetTasksFilterDto } from './Dto/get-tasks-filter.dto';
import { Task } from './Dto/task.entity';
import { UpdateTaskStatusDto } from './Dto/update-task-status.dto';
import { TasksService } from './tasks.service';
import { User } from '../users/model.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
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
    @Body() createTaskDto:CreateTaskDto,
    @GetUser() user:User
  ):Promise<Task>{
    return this.tasksService.createTask(createTaskDto, user);
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
