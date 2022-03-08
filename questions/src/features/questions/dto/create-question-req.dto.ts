import { Level } from 'src/common';

export class CreateQuestionReq {
  title!: string;

  problem!: string;

  inputFormat!: string;

  outputFormat!: string;

  questionSeed!: string;

  level = Level.Easy;

  points = 0;

  isPremium = false;

  testCases: any[] = [];
}
