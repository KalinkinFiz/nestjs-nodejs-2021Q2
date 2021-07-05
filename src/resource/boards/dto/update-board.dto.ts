import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsUUID, ValidateIf } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ValidateIf((obj) => obj.id !== undefined)
  @IsUUID()
  id?: string;
}
