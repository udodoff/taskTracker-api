import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ETaskStatus } from './types';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  description: string;

  @Column({ name: 'parent_task', type: 'int', nullable: true, default: null })
  parentTask: number | null;

  @Column({ name: 'status', type: 'varchar' })
  status: ETaskStatus;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'important', type: 'boolean', default: false })
  important: boolean;
}
