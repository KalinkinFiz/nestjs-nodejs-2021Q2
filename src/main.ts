import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication } from '@nestjs/common';
import * as chalk from 'chalk';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as YAML from 'yamljs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { PORT } from './environments';

async function bootstrap() {
  try {
    let app: INestApplication;

    app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    const document = YAML.load(path.join(__dirname, '../doc/api.yaml'));
    SwaggerModule.setup('api', app, document);

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
