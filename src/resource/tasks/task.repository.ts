import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends AbstractRepository<Task> {
  createTask(createTaskDto: CreateTaskDto) {
    const tasks = this.repository.create(createTaskDto);
    return this.manager.save(tasks);
  }

  getAllTasks(boardId: string) {
    return this.repository.find({ boardId });
  }

  getById(boardId: string, id: string) {
    return this.repository.findOne({ boardId, id });
  }

  updateById(boardId: string, id: string, updateTaskDto: UpdateTaskDto) {
    return this.repository.update({ boardId, id }, updateTaskDto);
  }

  updateByUserId(userId: string, updateTaskDto: UpdateTaskDto) {
    return this.repository.update({ userId }, updateTaskDto);
  }

  updateByBoardId(boardId: string, updateTaskDto: UpdateTaskDto) {
    return this.repository.update({ boardId }, updateTaskDto);
  }

  deleteById(boardId: string, id: string) {
    return this.repository.delete({ boardId, id });
  }
}
