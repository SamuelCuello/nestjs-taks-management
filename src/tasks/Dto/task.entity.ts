import { User } from "src/users/model.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from '../tasks-status.enum';


@Entity()
export class Task {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
title:string;

@Column()
description: string;

@Column()
status: TaskStatus;

@ManyToOne((_type)=> User, (user)=> user.tasks, {eager: false})
user: User
}