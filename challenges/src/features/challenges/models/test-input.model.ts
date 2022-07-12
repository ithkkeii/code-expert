import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TestInput {
  @Field(() => ID)
  id!: string;

  @Field()
  content!: string;
}
