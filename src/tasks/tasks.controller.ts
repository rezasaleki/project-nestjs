import { Controller,Get, Post, Body, Param, Delete, Patch, Query, ValidationPipe, UsePipes, ParseIntPipe, HttpCode, HttpException, HttpStatus, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskFilterDto } from './dto/get-task-filter.dto';
import { pipe } from 'rxjs';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from 'src/Entity/task.entity';
import { TaskStatus } from './task-status-enum';
import { RolesGuard } from 'src/Guards/roles.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get('/search')
    getTasks(@Query() filterDto: CreateTaskFilterDto): Promise<Task[]> {
        return this.tasksService.getTasksWithFilters(filterDto);
    }

    @Get('exception')
    @UseInterceptors(LoggingInterceptor)
    @HttpCode(200)
    // @UseGuards(RolesGuard)
    async execption() {
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        return "Role";
    }

    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createTaskDto : CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id :number) : Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id :number,
        @Body('status' ,TaskStatusValidationPipe) status:TaskStatus
    ) : Promise<Task> {
        return this.tasksService.updateTaskStatus(id , status);
    }

    @Get()
    @HttpCode(200)
    getAllTasks(): Promise<Task[]>{
        return this.tasksService.getTasks();
    }




    // @Get()
    // getAllTasks(): Task[]{
    //     return this.tasksService.getAllTasks();
    // }

    // @Get('/search')
    // getTasks(@Query(ValidationPipe) filterDto : CreateTaskFilterDto) : Task[] {
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getAllTasks();
    //     }
    //     return this.tasksService.getAllTasks();
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string) : Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id :string) : string {
    //     return this.tasksService.deleteTaskById(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id :string,
    //     @Body('status' ,TaskStatusValidationPipe) status:TaskStatus
    // ) : Task {
    //     return this.tasksService.updateTaskStatus(id , status);
    // }

    // @Post()
    // async create(
    //     @Body('title') title:string ,
    //     @Body('description') description:string
    // ): Promise<Task> {
    //     return this.tasksService.createTask(title , description);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // async create(@Body() createTaskDto : CreateTaskDto): Promise<Task> {
    //     return this.tasksService.createTask(createTaskDto);
    // }
  }
