import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { AuthModule } from 'src/features/auth/auth.module';
import { QuestionsController } from 'src/features/questions/questions.controller';
import { enhanceMiddlewares } from 'src/startup/middlewares';
import ormconfig from 'ormconfig';
import { QuestionsModule } from 'src/features/questions/questions.module';
import { Question } from 'src/features/questions/entities/questions.entity';
import { TestCase } from 'src/features/questions/entities/test-case.entity';
import { CreateQuestionReq } from 'src/features/questions/dto/create-question-req.dto';
import { Repository } from 'typeorm';

describe('QuestionsController', () => {
  let app: NestExpressApplication;
  let controller: QuestionsController;
  let questionsRepository: Repository<Question>;

  beforeAll(async () => {
    // Set needed env
    process.env.JWT_SECRET_KEY = 'test-secret';
    const host = 'localhost';
    const password = '12345678';
    const db = 'questions_service_test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        QuestionsModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            ...ormconfig,
            host,
            password,
            db,
            entities: ['src/**/*.entity.ts'],
            logging: false,
          }),
        }),
      ],
      controllers: [],
      providers: [],
    }).compile();

    controller = moduleFixture.get<QuestionsController>(QuestionsController);
    questionsRepository = moduleFixture.get<Repository<Question>>(
      getRepositoryToken(Question),
    );
    app = moduleFixture.createNestApplication();

    enhanceMiddlewares(app);

    await app.init();
  });

  afterEach(async () => {
    await questionsRepository
      .createQueryBuilder('questions')
      .delete()
      .where('questions.id > 0')
      .execute();
  });

  afterAll(() => {
    app.close();
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
    const cookies = await global.getAuthCookies();

    await request(app.getHttpServer())
      .post('/api/v1/questions')
      .set('Cookie', cookies)
      .send({
        title: 'bubble-sort',
        inputFormat: '',
        outputFormat: '',
        problem: '',
        questionSeed: '',
      } as CreateQuestionReq)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });

    return request(app.getHttpServer())
      .get('/api/v1/questions/bubble-sort')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });
  });

  it('should return 201 and question created if user sign in', async () => {
    const cookies = await global.getAuthCookies();

    return request(app.getHttpServer())
      .post('/api/v1/questions')
      .set('Cookie', cookies)
      .send({
        title: 'test',
        inputFormat: '',
        outputFormat: '',
        problem: '',
        questionSeed: '',
      } as CreateQuestionReq)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });
  });

  it('should return 401 if user not sign in', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/questions')
      .send({
        title: 'test',
        inputFormat: '',
        outputFormat: '',
        problem: '',
        questionSeed: '',
      } as CreateQuestionReq)
      .expect(401);
  });

  it('should return 403 (premium content) if user not sign in', async () => {
    const cookies = await global.getAuthCookies();

    await request(app.getHttpServer())
      .post('/api/v1/questions')
      .set('Cookie', cookies)
      .send({
        title: 'quick-sort',
        inputFormat: '',
        outputFormat: '',
        problem: '',
        questionSeed: '',
        isPremium: true,
      } as CreateQuestionReq)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });

    return request(app.getHttpServer())
      .get('/api/v1/questions/quick-sort')
      .expect(403);
  });
});
