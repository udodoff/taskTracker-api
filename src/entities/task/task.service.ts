import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateTask } from './types';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async createTask(task: ICreateTask): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId },
    });
  }
  async updateTask(task: ICreateTask): Promise<Task | null> {
    const existingTask = this.taskRepository.findOne({
      where: { id: task.id },
    });
    if (!existingTask) {
      throw new Error('Task not found');
    }
    return await this.taskRepository.save({
      ...existingTask,
      ...task,
    });
  }
  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete({ id });
    await this.taskRepository.query(
      `UPDATE tasks SET parent_task = null WHERE parent_task = ${id}`,
    );
  }
  async getChildrenTree(parentId: number): Promise<Task[]> {
    const query = `WITH RECURSIVE tree_view AS (
      SELECT id,
           parent_task,
           name,
           0 AS level,
           CAST(id AS varchar(50)) AS order_sequence
      FROM tasks
      WHERE parent_task = ${parentId}
       
  UNION ALL
   
      SELECT parent.id,
           parent.parent_task,
           parent.name,
           level + 1 AS level,
           CAST(order_sequence || '_' || CAST(parent.id AS VARCHAR (50)) AS VARCHAR(50)) AS order_sequence
      FROM tasks parent
      JOIN tree_view tv
        ON parent.parent_task = tv.id
  )
   
  SELECT t.id, t.description, t.parent_task, t.status, t.user_id, t.created_at, t.important,
     RIGHT('------------',level*3) || tv.name
       AS name
  FROM tree_view tv
  JOIN tasks t
    ON tv.id = t.id
  ORDER BY order_sequence;`;
    try {
      const res = await this.taskRepository.query(query);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
