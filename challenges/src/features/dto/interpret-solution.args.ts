import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class InterpretSolutionArgs {
  @Field()
  dataInput!: string;

  @Field()
  lang!: string;

  @Field(() => Int)
  challengeId!: number;

  @Field()
  typedCode!: string;
}
