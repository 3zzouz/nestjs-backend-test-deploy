import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CoursesModule } from './courses/courses.module';
import { SectionsModule } from './sections/sections.module';
import { ReviewsModule } from './reviews/reviews.module';
import { QuizsModule } from './quizs/quizs.module';
import { QuizscoursModule } from './quizscours/quizscours.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { StudentsModule } from './students/students.module';
import { TrainersModule } from './trainers/trainers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat.gateway';
//ici connexion a la database
@Module({
  imports: [
    // MongooseModule.forRoot(
    // 'mongodb+srv://qadg199:<pgkZJVfjnJXjdKRt>@cluster0.9zn9sy8.mongodb.net/?retryWrites=true&w=majority',
    // {
    //   dbName: 'formationnest',
    //  },
    //  ),
    MongooseModule.forRoot(
      'mongodb+srv://qadg199:pgkZJVfjnJXjdKRt@cluster0.9zn9sy8.mongodb.net/testnestjs?retryWrites=true&w=majority',
    ),
    UsersModule,
    CategoriesModule,
    CoursesModule,
    SectionsModule,
    ReviewsModule,
    QuizsModule,
    QuizscoursModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '4f4a7096e6e662',
          pass: '67272a0f0740d8',
        },
      },
      defaults: {
        from: 'no-reply<noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    StudentsModule,
    TrainersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
