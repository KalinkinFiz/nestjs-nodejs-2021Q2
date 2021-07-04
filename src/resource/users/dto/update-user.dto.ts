import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

import { IsUUID, ValidateIf } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ValidateIf((data) => data.id !== undefined)
  @IsUUID()
  id?: string;
}
