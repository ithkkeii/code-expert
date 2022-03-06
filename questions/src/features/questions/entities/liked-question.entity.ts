import { Question } from 'src/features/questions/entities/questions.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'liked_questions' })
export class LikedQuestion {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'question_id' })
  questionId!: number;

  @ManyToOne(() => Question, (question) => question.likedUser)
  @JoinColumn({ name: 'question_id' })
  question!: Question;
}
