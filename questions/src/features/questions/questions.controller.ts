import { Controller, Get } from '@nestjs/common';
import { Question } from 'src/features/questions/entities/questions.entity';
import { QuestionsService } from './questions.service';

@Controller('/api/v1/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/seed')
  async seed(): Promise<void> {
    return this.questionsService.seed();
  }

  @Get('/')
  async getQuestions(): Promise<Question[]> {
    const questions = await this.questionsService.getQuestions();

    return questions;
  }
}
