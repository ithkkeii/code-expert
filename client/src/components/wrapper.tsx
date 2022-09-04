import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import React from 'react';
import ChallengeBand from './challenge-band/challenge-band';

const useChallenges = () => {
  return useQuery(['challenges'], async () => {
    const { challenges } = await request(
      'http://localhost:3000/graphql',
      gql`
        query {
          challenges {
            id
            title
            slug
            level
          }
        }
      `,
    );

    return challenges;
  });
};

const Wrapper = () => {
  const { data, isLoading } = useChallenges();

  if (isLoading) return <div>loading</div>;

  return (
    <div>
      <div className="m-auto w-[400px]">
        {data.map((d: any) => (
          <ChallengeBand
            key={d.id}
            title={d.title}
            slug={d.title}
            like={false}
            level={d.level}
          />
        ))}
      </div>
    </div>
  );
};

export default Wrapper;
