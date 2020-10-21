import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task.model';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne : jest.fn() ,// mock
    createTask : jest.fn(),
    delete : jest.fn()
});

const mockUser = {username : 'Aria'};

describe('TaskService' , () => {

    const getMock = jest.fn();

    let taskService;
    let taskRepository;

    beforeEach(async () => {


        const module = await Test.createTestingModule({
            providers:[
                TasksService ,
                // { provide:getRepositoryToken(Task), useClass:TaskRepository },
                {provide : TaskRepository , useFactory:mockTaskRepository}
            ]
        }).compile();

        taskService    = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
        // taskRepository = await module.get<TaskRepository>(getRepositoryToken(Task));
    });

    it("should be defined task service", () => {
        expect(taskService).toBeDefined();
    });

    it("should be defined task repository", () => {
        expect(taskRepository).toBeDefined();
    });

    describe('getTasks', () => {

        it('gets all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');

            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            // const filter:GetTaskFilterDto = {status :  TaskStatus.IN_PROGRESS , search : 'some search query'}
            const result = await taskService.getTasks();
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });

    describe('getTaskById' , () => {

        it('call taskRepository.findOne() and successfuly retrieve and return the task' , async () => {

            const mockTask = { title: 'Test Title', description: 'Test Description' };
            taskRepository.findOne.mockResolvedValue(mockTask);
            const result = await taskService.getTaskById(1);
            expect(result).toEqual(mockTask);

            expect(taskRepository.findOne).toHaveBeenCalledWith(1);
        });

        it('throws an error as task is not found' , () => {

            taskRepository.findOne.mockResolvedValue(null);
            expect(taskService.getTaskById(1)).rejects.toThrow(NotFoundException);

        });

    });

    describe('createTask' , () => {

        it('calls taskRepository.createTask and returns the result' , async () => {

            taskRepository.createTask.mockResolvedValue('someValue');

            expect(taskRepository.createTask).not.toHaveBeenCalled();

            const createTaskDto = {title : 'Test Title' , description : 'Test Desc' };

            const result = await taskService.createTask(createTaskDto);
            expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto);
            expect(result).toEqual('someValue');

        });
    });

    describe('deleteTaskById' , () => {

        it('cllas taskRepository.delete() to delete a task' , async () => {

            taskRepository.delete.mockResolvedValue({ affected: 1 });
            expect(taskRepository.delete).not.toHaveBeenCalled();

            await taskService.deleteTaskById(1);
            expect(taskRepository.delete).toHaveBeenCalledWith(1);
        });

        it('throws an error as task could not be found' , async () => {

            taskRepository.delete.mockResolvedValue({ affected: 0 });
            expect(taskService.deleteTaskById(1)).rejects.toThrow(NotFoundException);

        });

    });

    describe('updateTaskStatus' , () => {

        it('updates a task status', async () => {

            const save = jest.fn().mockResolvedValue(true);

            taskService.getTaskById = jest.fn().mockResolvedValue({
                status: TaskStatus.OPEN,
                save
            });

            expect(taskService.getTaskById).not.toHaveBeenCalled();
            expect(save).not.toHaveBeenCalled();

            const result = await taskService.updateTaskStatus(1, TaskStatus.DONE);
            expect(taskService.getTaskById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
            expect(result.status).toEqual(TaskStatus.DONE);

        });

    });

});