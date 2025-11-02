import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://studio.apollographql.com',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //domain.com/api
  app.enableCors({
    origin: allowedOrigins,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
