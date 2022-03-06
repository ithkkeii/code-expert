import { Module } from '@nestjs/common';
import { QuestionsModule } from './features/questions/questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    QuestionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'questions',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
