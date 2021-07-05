import { IsString, IsArray } from 'class-validator';
import CreateColumnDto from '../../columns/column';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsArray()
  columns: CreateColumnDto[];
}
