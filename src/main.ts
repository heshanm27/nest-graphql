import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

import 'reflect-metadata';
declare const module: any;
async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: '*',
  });

  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  // Starts listening for shutdown hooks
  const PORT = process.env.PORT;
  app.enableShutdownHooks();
  await app.listen(PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
