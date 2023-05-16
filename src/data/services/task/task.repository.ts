import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/application/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/application/tasks/dto/get-tasks-filter.dto';
import { TaskStatus } from 'src/application/tasks/task-status.enum';
import { Repository } from 'typeorm';
import { Task } from '../../../application/tasks/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    readonly entityRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;

    const query = this.entityRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskById(id: string) {
    const found = await this.entityRepository.findOne({
      where: {
        id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;

    this.entityRepository.save(task);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.entityRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.entityRepository.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.entityRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
