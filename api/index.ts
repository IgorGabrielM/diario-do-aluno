import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import type { INestApplication } from '@nestjs/common';
import type { IncomingMessage, ServerResponse } from 'http';

let app: INestApplication;

async function bootstrap(): Promise<INestApplication> {
  const instance = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
  instance.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  instance.enableCors();
  await instance.init();
  return instance;
}

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (!app) {
    app = await bootstrap();
  }
  app.getHttpAdapter().getInstance()(req, res);
};
