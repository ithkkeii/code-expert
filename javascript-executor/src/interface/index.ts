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

export interface Data {
  submitId: string;
  solution: string;
  funcName: string;
  inputs: Input[];
}

export interface Input {
  id: number;
  content: string;
  assertion: string;
}
