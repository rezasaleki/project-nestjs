import { Injectable,NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import * as uuid from 'uuidv1'
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../src/Entity/task.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository){}


    async getTaskById(id:number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found!`);
        }

        return found;
    }

    async createTask(createTaskDto : CreateTaskDto): Promise<Task> {

        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTaskById(id: number): Promise<void>{

        const result = await this.taskRepository.delete(id);

        if (result.affected === 0){
            throw new NotFoundException(`Task With ID "${id}" not found!`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{

        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async getTasks(): Promise<Task[]> {
        return this.taskRepository.getTasks();
    }

    async getTasksWithFilters(filterDto: CreateTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasksWithFilters(filterDto);
    }



    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: CreateTaskFilterDto): Task[] {
    //     const { status , search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search){
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    //     }

    //     return tasks;
    // }

    // async createTask(title: string, description: string): Promise<Task> {
    //     const task: Task = {
    //         id : uuid(),
    //         title,
    //         description,
    //         status : TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // async createTask(createTaskTdo : CreateTaskDto): Promise<Task> {
    //     const {title , description} = createTaskTdo;
    //     const task: Task = {
    //         id : uuid(),
    //         title,
    //         description,
    //         status : TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // getTaskById(id : string) : Task {
    //     return this.tasks.find(task => task.id === id)
    // }

    // deleteTaskById(id: string): any{
    //     // this.tasks  = this.tasks.filter(task => task.id !== id);
    //     const index = this.tasks.findIndex(task => task.id === id);
    //     if (index != -1){
    //         this.tasks.splice(index, 1);
    //         return "deleted Task uuid " + id;
    //     }else {
    //         throw new NotFoundException(`Task With ID "${id}" not found!`);
    //     }
    // }

    // updateTaskStatus(id : string , status:TaskStatus) : Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}