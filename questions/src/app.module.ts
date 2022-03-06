import { Module } from '@nestjs/common';
import { QuestionsModule } from './features/questions/questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'ormconfig';

@Module({
  imports: [
    QuestionsModule,
    TypeOrmModule.forRootAsync({ useFactory: () => ormconfig }),
  ],
})
export class AppModule {}
