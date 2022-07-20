import { ApolloServer, gql } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import http from 'http';
import { __prod__ } from './constants';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import cookieSession from 'cookie-session';

const prisma = new PrismaClient({
  log: __prod__ ? [] : ['query', 'info', 'warn', 'error'],
});

const connectToDatabase = async () => {
  console.log('Connect to the database...');
  await prisma.$connect();
  console.log('Database connected!');
};

const typeDefs = gql`
  type User {
    id: ID
  }

  type Query {
    getUser: [User]
  }
`;

const resolvers = {
  Query: {
    getUser: async () => prisma.user.findMany(),
  },
};

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({ req }),
  });
  await server.start();

  // Addition middlewares
  app.set('trust proxy', 1);
  app.use(
    cookieSession({
      name: 'session',
      keys: ['secret-key'],
      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: true,
      sameSite: 'none',
    }),
  );

  server.applyMiddleware({
    app,
    path: '/',
    cors: {
      credentials: true,
      origin: ['http://localhost:4000', 'https://studio.apollographql.com/'],
    },
  });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const main = async () => {
  await connectToDatabase();

  await startApolloServer(typeDefs, resolvers);
};

main().finally(async () => {
  await prisma.$disconnect();
});
