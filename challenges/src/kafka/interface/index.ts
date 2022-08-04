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
