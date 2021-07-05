import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

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
  entities: [path.join(__dirname, '../**/*.entity.ts')],
  synchronize: true,
  migrationsRun: true,
  migrations: [path.join(__dirname, 'migrations/*.ts')],
  cli: {
    migrationsDir: 'migrations',
  },
} as ConnectionOptions;
