import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@EntityRepository(Board)
export class BoardRepository extends AbstractRepository<Board> {
  createBoard(createBoardDto: CreateBoardDto) {
    const boards = this.repository.create(createBoardDto);
    return this.manager.save(boards);
  }

  getAllBoards() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, updateBoardDto: UpdateBoardDto) {
    return this.repository.update({ id }, updateBoardDto);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }
}
