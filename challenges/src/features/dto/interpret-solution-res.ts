import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InterpretSolutionRes {
  @Field()
  interpretId!: string;
}
