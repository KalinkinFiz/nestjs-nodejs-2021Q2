import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { BoardRepository } from './board.repository';

import Column from '../columns/column';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  createBoard = async (createBoardDto: CreateBoardDto): Promise<Board> => {
    const columns = await Promise.all(createBoardDto.columns?.map(Column.create) || []);
    const boardCreatable = { ...createBoardDto, columns };
    const board = await this.boardRepository.createBoard(boardCreatable);
    return board;
  };

  getAll = async (): Promise<Board[]> => {
    return this.boardRepository.getAllBoards();
  };

  getById = async (id: string): Promise<Board | null> => {
    const board = await this.boardRepository.getById(id);
    if (!board) return null;
    return board;
  };

  deleteById = async (id: string): Promise<Board | null> => {
    const boardDeletable = await this.boardRepository.getById(id);
    if (!boardDeletable) return null;
    await this.boardRepository.deleteById(id);

    // await this.taskRepository.updateByBoardId(id, { boardId: null });

    return boardDeletable!;
  };

  updateById = async (id: string, updateBoardDto: UpdateBoardDto): Promise<Board | null> => {
    const columns = await Promise.all(updateBoardDto.columns?.map(Column.create) || []);
    const boardUpdatable = { ...updateBoardDto, columns };
    await this.boardRepository.updateById(id, boardUpdatable);
    const board = await this.boardRepository.getById(id);
    if (!board) return null;
    return board;
  };
}
