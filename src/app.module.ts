import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/application/tasks/task.entity';
import { TasksModule } from './application/tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from 'src/auth/user.entity';

// decorators
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
//      autoLoadEntities: true,
      entities: [Task, User],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
