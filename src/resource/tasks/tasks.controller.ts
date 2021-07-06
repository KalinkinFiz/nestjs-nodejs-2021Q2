import { Controller, Get, Post, Put, Delete, Req, Res, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from '../../middleware/http-exception.filter';

import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('boards/:boardId/tasks')
@UseFilters(HttpExceptionFilter)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const { boardId } = req.params;
    const tasks = await this.tasksService.getAll(boardId!);

    return res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
  }

  @Post('/')
  async createUser(@Req() req: Request, @Res() res: Response) {
    const { boardId } = req.params;

    const task = await this.tasksService.createTask(boardId!, req.body);

    if (task) {
      res.status(StatusCodes.CREATED).json(Task.toResponse(task));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { boardId, id } = req.params;

    const task = await this.tasksService.getById(boardId!, id!);

    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }

  @Put('/:id')
  async updateUser(@Req() req: Request, @Res() res: Response) {
    const { boardId, id } = req.params;

    const task = await this.tasksService.updateById(boardId!, id!, req.body);

    if (task) {
      res.status(StatusCodes.OK).json(Task.toResponse(task));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { boardId, id } = req.params;

    const task = await this.tasksService.deleteById(boardId!, id!);

    if (task) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'TASK_DELETED', msg: 'The task has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }
}
