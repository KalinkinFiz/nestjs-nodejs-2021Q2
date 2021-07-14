import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID(4)
  userId: string | null;

  @IsOptional()
  @IsUUID(4)
  boardId: string | null;

  @IsOptional()
  @IsUUID(4)
  columnId: string | null;
}
