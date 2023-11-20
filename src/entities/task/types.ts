export enum ETaskStatus {
  Planned = 'Planned',
  Progress = 'Progress',
  Completed = 'Completed',
}

export interface ICreateTask {
  id?: number;
  name: string;
  description: string;
  parentTask: number | null;
  status: ETaskStatus;
  userId: number;
  createdAt: Date;
  important: boolean;
}
