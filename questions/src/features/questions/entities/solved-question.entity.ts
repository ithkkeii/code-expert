import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from 'src/features/questions/entities/questions.entity';

@Entity({ name: 'solved_questions' })
export class SolvedQuestion {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'question_id' })
  questionId!: number;

  @ManyToOne(() => Question, (question) => question.solvedUser)
  @JoinColumn({ name: 'question_id' })
  question!: Question;
}
