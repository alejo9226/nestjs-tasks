import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// decorators
@Module({
  imports: [TasksModule],
})
export class AppModule {}
