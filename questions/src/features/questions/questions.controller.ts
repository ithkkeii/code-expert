import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Level } from 'src/common';
import { CurrentUserGuard } from 'src/features/auth/guards/current-user.guard';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { CreateQuestionReq } from 'src/features/questions/dto/create-question-req.dto';
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

  @UseGuards(CurrentUserGuard)
  @Get('/:slug')
  async getQuestion(
    @Req() req: Request,
    @Param('slug') slug: string,
  ): Promise<Question> {
    const isPremiumAccessible = !!req.user;

    return this.questionsService.getQuestion(slug, { isPremiumAccessible });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createQuestion(@Body() detail: CreateQuestionReq) {
    return this.questionsService.createQuestion(detail);
  }
}
