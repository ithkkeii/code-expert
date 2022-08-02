import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SubmitSolutionArgs {
  @Field()
  guestId!: string;

  @Field(() => Int)
  challengeId!: number;

  @Field()
  solution!: string;
}
