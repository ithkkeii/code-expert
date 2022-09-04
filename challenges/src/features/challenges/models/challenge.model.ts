import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TestCase } from './test-case.model';
import { TestInput } from './test-input.model';

export enum Level {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

registerEnumType(Level, {
  name: 'Level',
});

@ObjectType()
export class Challenge {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  slug!: string;

  @Field()
  point!: number;

  @Field(() => Level)
  level!: Level;

  @Field()
  seed!: string;

  @Field(() => [TestCase])
  testCases!: TestCase[];

  @Field(() => [TestInput])
  testInputs!: TestInput[];
}
