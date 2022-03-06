import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

describe('QuestionsController', () => {
  let app: NestExpressApplication;
  let controller: QuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 200 and question list', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/questions')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });
  });

  it('should return 200 and question content', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/questions/bubble-sort')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });
  });

  it('should return 401 (premium content) if user not sign in', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/questions/quick-sort')
      .expect(401);
  });
});
