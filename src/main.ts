import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication } from '@nestjs/common';
import * as chalk from 'chalk';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as YAML from 'yamljs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import { PORT, USE_FASTIFY } from './environments';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

async function bootstrap() {
  try {
    let app: INestApplication;

    if (!USE_FASTIFY) {
      app = await NestFactory.create<NestExpressApplication>(AppModule);
    } else {
      app = await NestFactory.create<NestFastifyApplication>(AppModule);
    }

    app.useGlobalInterceptors(new LoggingInterceptor());

    const document = YAML.load(path.join(__dirname, '../doc/api.yaml'));
    SwaggerModule.setup('doc', app, document);

    await app.listen(PORT, () =>
      Logger.log(
        `🚀  Server ready at https://localhost:${chalk.hex('#87e8de').bold(`${PORT!}`)}`,
        'Bootstrap',
      ),
    );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit(1);
  }
}

bootstrap().catch((e) => {
  throw e;
});
