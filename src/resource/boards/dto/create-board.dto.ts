import CreateColumnDto from '../../columns/column';
import { IsString, IsArray } from 'class-validator';
export class CreateBoardDto {
  @IsString()
  title: string;
  @IsArray()
  columns: CreateColumnDto[];
}
