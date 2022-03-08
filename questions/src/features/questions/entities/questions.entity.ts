import { Level } from 'src/common';
import { LikedQuestion } from 'src/features/questions/entities/liked-question.entity';
import { SolvedQuestion } from 'src/features/questions/entities/solved-question.entity';
import { TestCase } from 'src/features/questions/entities/test-case.entity';
import {
  Check,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'slug' })
  slug!: string;

  @Column({ name: 'problem', type: 'text' })
  problem!: string;

  @Column({ name: 'input_format', type: 'text' })
  inputFormat!: string;

  @Column({ name: 'output_format', type: 'text' })
  outputFormat!: string;

  @Column({ name: 'challenge_seed', type: 'text' })
  questionSeed!: string;

  @Column({ name: 'level', type: 'enum', enum: Level, default: Level.Easy })
  level!: Level;

  @Column({ name: 'points', default: 0 })
  @Check('points >= 0')
  points?: number;

  @Column({ name: 'is_premium', default: false })
  isPremium?: boolean;

  @OneToMany(() => TestCase, (testCase) => testCase.question, { eager: true })
  testCases!: TestCase[];

  @OneToMany(() => SolvedQuestion, (solvedQuestion) => solvedQuestion.question)
  solvedUser!: SolvedQuestion;

  @OneToMany(() => LikedQuestion, (likedQuestion) => likedQuestion.question)
  likedUser!: LikedQuestion;
}
