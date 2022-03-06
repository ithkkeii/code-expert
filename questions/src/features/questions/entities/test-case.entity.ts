import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from 'src/features/questions/entities/questions.entity';

@Entity({ name: 'test_cases' })
export class TestCase {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'text' })
  text!: string;

  @Column({ name: 'test_string' })
  testString!: string;

  @Column({ name: 'question_id' })
  questionId!: number;

  @ManyToOne(() => Question, (question) => question.testCases)
  @JoinColumn({ name: 'question_id' })
  question!: Question;
}
