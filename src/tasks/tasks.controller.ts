import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Logger } from '@nestjs/common';
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
  private logger = new Logger('TaskController')
  constructor(private tasksService: TasksService){}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User
    ): Promise<Task[]>{
    this.logger.verbose(`User: ${user.fullName} retrevering All Taks, Filters: ${JSON.stringify(filterDto)}`);
      return this.tasksService.getAllTasks(filterDto, user);
    
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User
    ): Promise<Task>{
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto:CreateTaskDto,
    @GetUser() user:User
  ):Promise<Task>{
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user:User
    ): Promise<void>{
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user:User
  ): Promise<Task> {
    const {status} = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(id,status, user);
  }
}
