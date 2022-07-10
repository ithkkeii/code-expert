import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Challenge {
  @Field(() => Int)
  id!: number;

  @Field()
  title?: string;

  @Field()
  slug?: string;
}
