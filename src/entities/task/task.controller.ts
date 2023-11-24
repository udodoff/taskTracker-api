import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/auth.guard';
import { TaskService } from './task.service';
import { ICreateTask } from './types';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTask(@Body() createTaskDto: ICreateTask) {
    try {
      const newTask = await this.taskService.createTask(createTaskDto);
      return { task: newTask, status: 'ok' };
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: number) {
    try {
      await this.taskService.deleteTask(taskId);
      return { status: 'ok' };
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateTask(@Body() createTaskDto: ICreateTask) {
    try {
      const newTask = await this.taskService.updateTask(createTaskDto);
      return { task: newTask, status: 'ok' };
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasksByUserId(@Query() { userId }: { userId: number }) {
    return this.taskService.getTasksByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('children')
  async getChildrenTree(@Query() { parentTask }: { parentTask: number }) {
    try {
      return await this.taskService.getChildrenTree(parentTask);
    } catch (error) {
      return error;
    }
  }
}
