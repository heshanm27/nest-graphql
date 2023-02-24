import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as chokidar from 'chokidar';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const PORT = process.env.PORT;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);

  // const watcher = chokidar.watch('src/app.module.ts', { ignoreInitial: true });
  // watcher.on('all', async () => {
  //   console.log('Reloading server...');
  //   const module = await import('./app.module');
  //   const newApp = await NestFactory.create(module.AppModule);
  //   await newApp.listen(3001);
  //   console.log('Server reloaded');
  // });
}
bootstrap();
