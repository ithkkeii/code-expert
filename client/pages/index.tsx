import type { NextPage } from 'next';
import ChallengeBand from '../src/components/challenge-band/challenge-band';

const fakeData = [
  { id: 1, title: 'Find success path', isLiked: false, level: 'easy' },
  { id: 2, title: 'Who is real', isLiked: false, level: 'easy' },
  { id: 3, title: 'Remove the island', isLiked: false, level: 'easy' },
  { id: 4, title: 'Chaos new year', isLiked: true, level: 'medium' },
  { id: 5, title: 'Random string', isLiked: false, level: 'medium' },
  { id: 6, title: 'Max path sum in binary tree', isLiked: true, level: 'hard' },
  {
    id: 7,
    title: 'This title is long enough to hidden and show dot',
    isLiked: true,
    level: 'medium',
  },
];

export type Level = 'easy' | 'medium' | 'hard';

const Home: NextPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="m-auto w-[400px]">
        {fakeData.map((d) => (
          <ChallengeBand
            key={d.id}
            title={d.title}
            slug={d.title}
            like={d.isLiked}
            level={d.level}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
