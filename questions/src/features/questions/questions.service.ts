import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionReq } from 'src/features/questions/dto/create-question-req.dto';
import { Question } from 'src/features/questions/entities/questions.entity';
import { questions } from 'src/features/questions/seed';
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

  async getQuestion(slug: string, options: { isPremiumAccessible: boolean }) {
    const { isPremiumAccessible } = options;

    const question = await this.questionsRepository
      .createQueryBuilder('question')
      .where('question.slug = :slug', { slug })
      .leftJoinAndSelect('question.testCases', 'testCase')
      .getOne();

    if (!question) {
      throw new NotFoundException();
    }

    if (question.isPremium && !isPremiumAccessible) {
      throw new ForbiddenException();
    }

    return question;
  }

  async createQuestion(detail: CreateQuestionReq) {
    const {
      title,
      level,
      inputFormat,
      isPremium,
      outputFormat,
      points,
      problem,
      questionSeed,
      testCases,
    } = detail;

    const question = {
      ...new Question(),
      title,
      slug: title.split(' ').join('-'),
      level,
      inputFormat,
      isPremium,
      outputFormat,
      points,
      problem,
      questionSeed,
      testCases,
    };

    return this.questionsRepository.save(question);
  }

  async seed() {
    const promises = questions.map((question) => {
      const {
        title,
        slug,
        questionSeed,
        inputFormat,
        isPremium,
        level,
        outputFormat,
        points,
        problem,
      } = question;

      const entity = new Question();
      entity.title = title;
      entity.slug = slug;
      entity.questionSeed = questionSeed;
      entity.inputFormat = inputFormat;
      entity.isPremium = isPremium;
      entity.outputFormat = outputFormat;
      entity.level = level as any;
      entity.points = points;
      entity.problem = problem;

      return this.questionsRepository.save(entity);
    });

    await Promise.all([...promises]);
  }
}
