import { Task } from "src/tasks/Dto/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: Boolean;

  @OneToMany((_type) => Task, (task) => task.user, {eager: true})
  tasks: Task[]
}