import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/application/tasks/task.entity';
import { TasksRepository } from 'src/data/services/task';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksRepository],
  exports: [TasksRepository],
})
export class TaskDataServiceModule {}
