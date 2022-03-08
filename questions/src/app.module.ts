import { Module } from '@nestjs/common';
import { QuestionsModule } from './features/questions/questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'ormconfig';
import { AuthModule } from 'src/features/auth/auth.module';

@Module({
  imports: [
    QuestionsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({ useFactory: () => ormconfig }),
  ],
})
export class AppModule {}
