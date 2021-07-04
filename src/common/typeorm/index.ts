import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';

import config from '../../config.orm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options = {
      ...config,
      synchronize: true,
    };
    createConnection(options)
      .then((data) => {
        Logger.log(`☁️  Database connected`, 'TypeORM', false);
      })
      .catch((err) => {
        Logger.error(`❌  Database connect error`, '', 'TypeORM', false);
      });

    return options;
  }
}
