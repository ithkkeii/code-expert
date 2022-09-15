export interface SubmitSolutionMessage {
  guestId: string;
  challengeId: number;
  solution: string;
  testCase: {
    id: number;
    content: string;
  };
  testInput: {
    id: number;
    content: string;
  };
}

export interface InterpretSolutionMessage {
  interpretId: string;
  lang: string;
  challengeId: number;
  dataInput: string;
  typedCode: string;
  rightSolution: string;
}
