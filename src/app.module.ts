import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TasksModule, 
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database:'task-management',
      autoLoadEntities: true,
      synchronize: true,
    })

  ],
})
export class AppModule {}
