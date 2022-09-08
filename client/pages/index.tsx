import type { NextPage } from 'next';
import Button from '../src/components/button/button';
import CodeEditor from '../src/components/code-editor/code-editor';
import { Example } from '../src/components/side-tools/side-tools';
import Wrapper from '../src/components/wrapper';

// TODO: Is it possible to have auto typed here ?
export type Level = 'Easy' | 'Medium' | 'Hard';

const Home: NextPage = () => {
  return (
    <div className="flex h-[100vh] w-full flex-col justify-center bg-gray-100">
      <div className="h-[5vh] border border-red-200">Nav Bar</div>
      <div className="flex flex-1 flex-row border border-blue-300">
        <div className="h-[95vh] flex-1 border border-pink-300">
          <Example />
        </div>
        <div className="flex flex-1 flex-col border border-black">
          <div className="flex-1">editor</div>
          <div className="flex items-center justify-end">
            <Button variant="text" className="m-4">
              Run code
            </Button>
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
