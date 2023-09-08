import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { Student, studentSchema } from 'src/students/entities/student.entity';
import { Trainer, trainerSchema } from 'src/trainers/entities/trainer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'users',
        schema: userSchema,
        discriminators: [
          {
            name: Student.name,
            schema: studentSchema,
          },
          { name: Trainer.name, schema: trainerSchema },
        ],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
