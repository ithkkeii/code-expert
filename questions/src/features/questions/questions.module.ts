import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { AuthModule } from 'src/features/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/features/questions/entities/questions.entity';
import { TestCase } from 'src/features/questions/entities/test-case.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Question, TestCase])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
