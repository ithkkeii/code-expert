export interface SubmittedSolutionMessage {
  solution: string;
  funcName: string;
  guestId: string;
  testCase: {
    id: number;
    content: string;
  };
  assertStatement: {
    id: number;
    content: string;
  };
  timeLimit: 0;
}
