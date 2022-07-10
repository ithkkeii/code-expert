import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { Resolvers } from './generated/resolvers-types';
import { readFileSync } from 'fs';

const typeDefs = readFileSync('./schema.graphql', 'utf8');

const main = async () => {
  const prisma = new PrismaClient();

  const resolvers: Resolvers = {
    Query: {
      challenges: async (): Promise<any> => {
        const challenges = await prisma.challenge.findMany();
        return challenges;
      },
    },
    Mutation: {
      createChallenge: async () => {
        const challenge = await prisma.challenge.create({
          data: { title: 'bubble sort', slug: 'bubble-sort', point: 0 },
        });

        return {
          id: challenge.id,
          title: challenge.title,
          slug: challenge.slug,
          point: challenge.point,
        };
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

main();
