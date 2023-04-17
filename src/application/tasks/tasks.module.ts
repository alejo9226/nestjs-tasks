import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskDataServiceModule } from 'src/data/services/task';

@Module({
  imports: [TaskDataServiceModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [],
})
export class TasksModule {}
