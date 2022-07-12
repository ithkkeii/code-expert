import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TestCase {
  @Field(() => ID)
  id!: string;

  @Field()
  content!: string;
}
