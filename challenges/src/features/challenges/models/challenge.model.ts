import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TestCase } from './test-case.model';
import { TestInput } from './test-input.model';

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

  @Field()
  seed!: string;

  @Field(() => [TestCase])
  testCases!: TestCase[];

  @Field(() => [TestInput])
  testInputs!: TestInput[];
}
