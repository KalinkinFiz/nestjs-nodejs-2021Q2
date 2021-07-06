import { Controller, Get, Post, Put, Delete, Req, Res, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from '../../middleware/http-exception.filter';

import { UsersService } from './users.service';
import { UserModel } from './entities/user.entity';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAll(@Req() _req: Request, @Res() res: Response) {
    const users = await this.usersService.getAll();
    return res.status(StatusCodes.OK).json(users.map(UserModel.toResponse));
  }

  @Post('/')
  async createUser(@Req() req: Request, @Res() res: Response) {
    const user = await this.usersService.createUser(req.body);

    if (user) {
      res.status(StatusCodes.CREATED).json(UserModel.toResponse(user));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const user = await this.usersService.getById(id || '');

    if (user) {
      res.json(UserModel.toResponse(user));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  }

  @Put('/:id')
  async updateUser(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const user = await this.usersService.updateById(id!, req.body);

    if (user) {
      res.status(StatusCodes.OK).json(UserModel.toResponse(user));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  }

  @Delete('/:userId')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const user = await this.usersService.deleteById(id || '');

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'USER_DELETED', msg: 'The user has been deleted' });
  }
}
