import { IsString, IsInt, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  @IsUUID()
  userId: string | null;

  @IsUUID()
  boardId: string | null;

  @IsUUID()
  columnId: string | null;
}
