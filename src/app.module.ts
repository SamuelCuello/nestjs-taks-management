import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage, ${process.env.STAGE}`],
    }),
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
