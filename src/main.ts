import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//aucune liaison avec bootrstrap (css framework)
//connexion au serveur
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('E-Learning Platform')
    .setDescription('Formation NestJs')
    .addTag('users')
    .addTag('categories')
    .addTag('courses')
    .addTag('sections')
    .addTag('reviews')
    .addTag('quizs')
    .addTag('quizcours')
    .addTag('students')
    .addTag('trainers')
    .addTag('auth')
    .addBearerAuth(
      {
        description: 'Please Enter Token in the following format:Bearer<JWT>',
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .addBearerAuth(
      {
        description: 'Please Enter Token in the following format:Bearer<JWT>',
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'refresh-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();
