import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  createTask = async (boardId: string, createTaskDto: CreateTaskDto): Promise<Task> => {
    const taskCreatable = { ...createTaskDto, boardId };
    const task = await this.taskRepository.createTask(taskCreatable);
    return task;
  };

  getAll = async (boardId: string): Promise<Task[]> => this.taskRepository.getAllTasks(boardId);

  getById = async (boardId: string, id: string): Promise<Task | null> => {
    const task = await this.taskRepository.getById(boardId, id);
    if (!task) return null;
    return task;
  };

  deleteById = async (boardId: string, id: string): Promise<Task | null> => {
    const taskDeletable = await this.taskRepository.getById(boardId, id);
    if (!taskDeletable) return null;
    await this.taskRepository.deleteById(boardId, id);
    return taskDeletable;
  };

  updateById = async (
    boardId: string,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> => {
    const task = await this.taskRepository.getById(boardId, id);
    if (!task) return null;
    await this.taskRepository.updateById(boardId, id, updateTaskDto);
    return task;
  };
}
