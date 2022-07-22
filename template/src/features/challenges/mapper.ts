import { Challenge } from '../../generated/graphql';
import {
  Challenge as ChallengeModel,
  TestCase as TestCaseModel,
  TestInput as TestInputModel
} from '@prisma/client';

type ChallengesQueryRes = ChallengeModel & {
  testCases: TestCaseModel[];
  testInputs: TestInputModel[];
};

export const mapChallengeToSchema = (
  challenge: ChallengesQueryRes
): Challenge => {
  return { ...challenge };
};

export const mapChallengesToSchema = (
  challenges: ChallengesQueryRes[]
): Challenge[] => challenges.map((c) => mapChallengeToSchema(c));
