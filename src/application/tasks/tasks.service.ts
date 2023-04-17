import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from 'src/application/tasks/task.entity';
import { TasksRepository } from 'src/data/services/task';
//import fs from 'fs';

@Injectable()
export class TasksService {
  // Inject tasks repository to be able to use it.
  constructor(private readonly tasksRepository: TasksRepository) {}
  // private tasks: Task[] = [];

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDto);
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((t) => t.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((t) => {
  //       if (t.title.includes(search) || t.description.includes(search)) {
  //         return true;
  //       }

  //       return false;
  //     });
  //   }

  //   return tasks;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.getTaskById(id);
  }

  async deleteTask(id: string): Promise<void> {
    return await this.tasksRepository.deleteTask(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return await this.tasksRepository.updateTaskStatus(id, status);
  }
}
