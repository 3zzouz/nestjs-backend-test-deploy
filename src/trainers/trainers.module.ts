import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { trainerSchema } from './entities/trainer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'trainers', schema: trainerSchema }]),
  ],
  controllers: [TrainersController],
  providers: [TrainersService],
})
export class TrainersModule {}
