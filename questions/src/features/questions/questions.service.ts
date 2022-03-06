import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/features/questions/entities/questions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async getQuestions() {
    const questions = await this.questionsRepository.find({
      select: ['id', 'level', 'isPremium', 'points', 'title', 'slug'],
    });

    return questions;
  }

  async seed() {
    const bubbleSort = new Question();
    bubbleSort.title = 'bubble-sort';
    bubbleSort.slug = 'bubble-sort';
    bubbleSort.inputFormat = '';
    bubbleSort.isPremium = false;
    bubbleSort.outputFormat = '';
    bubbleSort.points = 100;
    bubbleSort.questionSeed = '';

    await this.questionsRepository.save(bubbleSort);
  }
}
