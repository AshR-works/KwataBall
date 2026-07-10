// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe({
//     whitelist: true,       // supprime les champs non déclarés dans le DTO
//     forbidNonWhitelisted: true, // erreur si champs inconnus envoyés
//     transform: true,       // transforme les types automatiquement
//   }));
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();