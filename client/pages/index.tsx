import type { NextPage } from 'next';
import Split, { SplitProps } from 'react-split';
import CategoryTabs from '../src/components/category-tabs/category-tabs';
import CodeEditor from '../src/components/code-editor/code-editor';
import Console from '../src/components/console/console';
import NavBar from '../src/components/nav-bar/nav-bar';
import TestCases from '../src/components/test-cases/test-cases';

// TODO: Is it possible to have auto typed here ?
export type Level = 'Easy' | 'Medium' | 'Hard';

const Home: NextPage = () => {
  const renderGutter: SplitProps['gutter'] = (_, direction) => {
    const gutter = document.createElement('div');
    gutter.className = `gutter gutter-${direction} bg-gradient-to-b from-gray-50`;
    return gutter;
  };

  return (
    <div className="flex h-[100vh] w-full flex-col justify-center">
      <div className="h-[5vh]">
        <NavBar />
      </div>
      <Split className="flex flex-1" gutter={renderGutter}>
        <Split
          className="flex flex-col"
          direction="vertical"
          gutter={renderGutter}
        >
          {/* <CategoryTabs /> */}
          <div className="flex-1">category tabs</div>
          <TestCases />
        </Split>
        <Split
          className="flex flex-col"
          direction="vertical"
          gutter={renderGutter}
        >
          {/* <CodeEditor /> */}
          <div>code editor</div>
          <Console />
        </Split>
      </Split>
    </div>
  );
};

export default Home;
