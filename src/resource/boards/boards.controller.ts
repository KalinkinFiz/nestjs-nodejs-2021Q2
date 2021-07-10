import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from '../../middleware/http-exception.filter';

import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/')
  async getAll(@Req() _req: Request, @Res() res: Response) {
    const boards = await this.boardsService.getAll();
    return res.status(StatusCodes.OK).json(boards.map(Board.toResponse));
  }

  @Post('/')
  async createUser(@Req() req: Request, @Res() res: Response) {
    const { title, columns }: Board = req.body;

    const board = await this.boardsService.createBoard({ title, columns });

    if (board) {
      res.status(StatusCodes.CREATED).json(Board.toResponse(board));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BOARD_NOT_CREATE', msg: 'Board not create' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const board = await this.boardsService.getById(id || '');

    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }
  }

  @Put('/:id')
  async updateUser(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const board = await this.boardsService.updateById(id!, req.body);

    if (board) {
      res.status(StatusCodes.OK).json(Board.toResponse(board));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const board = await this.boardsService.deleteById(id || '');

    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'BOARD_DELETED', msg: 'The board has been deleted' });
  }
}
