import type { NextPage } from 'next';
import Wrapper from '../src/components/wrapper';

export type Level = 'easy' | 'medium' | 'hard';

const Home: NextPage = () => {
  return (
    <div className="bg-gray-100">
      <Wrapper />
    </div>
  );
};

export default Home;
