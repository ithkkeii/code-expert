import type { NextPage } from 'next';
import CodeEditor from '../src/components/code-editor/code-editor';
import SideTools, { Example } from '../src/components/side-tools/side-tools';
import Wrapper from '../src/components/wrapper';

// TODO: Is it possible to have auto typed here ?
export type Level = 'Easy' | 'Medium' | 'Hard';

const Home: NextPage = () => {
  return (
    <div className="h-[100vh] w-full bg-gray-100">
      <div className="align-center flex h-full w-full">
        <div className="flex-1">
          <SideTools />
          <Example />
        </div>
        <div className="flex-1">{/* <CodeEditor /> */}</div>
      </div>
    </div>
  );
};

export default Home;
