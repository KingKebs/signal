import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Enable global validation using class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS for Next.js frontend
  app.enableCors();

  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
