import { Repository, EntityRepository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.model";
import { CreateTaskFilterDto } from "./dto/get-task-filter.dto";
import { Task } from '../../src/Entity/task.entity';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask (createTaskDto : CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

    async getTasks(): Promise<Task[]> {

        const query = this.createQueryBuilder('task');
        const tasks = await query.getMany();
        return tasks;
    }

    async getTasksWithFilters(filterDto : CreateTaskFilterDto): Promise<Task[]> {

        const { status , search } = filterDto;

        const query = this.createQueryBuilder('task');

        if (status){
            query.andWhere('task.status = :status', { status });
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search : `%${ search }%` });
        }


        const tasks = query.getMany();

        return tasks;
    }

}