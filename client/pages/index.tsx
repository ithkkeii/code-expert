import type { NextPage } from 'next';
import Wrapper from '../src/components/wrapper';

// TODO: Is it possible to have auto typed here ?
export type Level = 'Easy' | 'Medium' | 'Hard';

const Home: NextPage = () => {
  return (
    <div className="bg-gray-100">
      <Wrapper />
    </div>
  );
};

export default Home;
