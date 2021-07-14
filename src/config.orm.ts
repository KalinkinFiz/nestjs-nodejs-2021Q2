import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { User } from './resource/users/entities/user.entity';
import { Board } from './resource/boards/entities/board.entity';
import { Task } from './resource/tasks/entities/task.entity';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  entities: [User, Board, Task],
  // synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
} as ConnectionOptions;
