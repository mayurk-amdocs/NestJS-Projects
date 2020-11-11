import { Body, Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        ) {}

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        }
        return found;
    }
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Task by ID ${id} not found :/`);
    //     }
    //     else{
    //         return found;
    //     }
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        
        return this.taskRepository.createTask(createTaskDto);
    }
    // createTask(createTaskDto: CreateTaskDto): Task {

    //     const {title, description} = createTaskDto;

    //     const task: Task={
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }
    // deleteTaskById(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();

        return task;
    }
    // updateTaskStatusById(id: string, status: TaskStatus) {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
