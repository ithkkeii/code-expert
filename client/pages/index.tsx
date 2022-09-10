import type { NextPage } from 'next';
import Split from 'react-split';
import CategoryTabs from '../src/components/category-tabs/category-tabs';
import CodeEditor from '../src/components/code-editor/code-editor';
import NavBar from '../src/components/nav-bar/nav-bar';

// TODO: Is it possible to have auto typed here ?
export type Level = 'Easy' | 'Medium' | 'Hard';

const Home: NextPage = () => {
  return (
    <div className="flex h-[100vh] w-full flex-col justify-center">
      <div className="h-[5vh]">
        <NavBar />
      </div>
      <div className="flex flex-1 flex-row">
        <Split
          className="flex"
          gutter={(_, direction) => {
            const gutter = document.createElement('div');
            gutter.className = `gutter gutter-${direction} bg-gradient-to-b from-gray-50`;
            return gutter;
          }}
        >
          <CategoryTabs />
          <CodeEditor />
        </Split>
      </div>
    </div>
  );
};

export default Home;
