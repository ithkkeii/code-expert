import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import http from 'http';
import { __prod__ } from './constants';
import cookieSession from 'cookie-session';
import { readFileSync } from 'fs';
import { Resolvers } from './generated/graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { mapUsersToSchema } from './map-user-to-schema';
import { validateLoginInput } from './validator';
import { createConsumer, createProducer } from './connect-to-kafka';

const prisma = new PrismaClient({
  log: __prod__ ? [] : ['query', 'info', 'warn', 'error']
});

const connectToDatabase = async () => {
  console.log('Connect to the database...');
  await prisma.$connect();
  console.log('Database connected!');
};

const typeDefs = readFileSync(require.resolve('../schema.graphql')).toString(
  'utf-8'
);

export type ApolloServerContext = {
  req: Request;
  res: Response;
  prisma: typeof prisma;
};

const resolvers: Resolvers<ApolloServerContext> = {
  Query: {
    getUser: async (_, args, context) => {
      console.log(JSON.stringify(context.req.session, null, 2));
      const users = await prisma.user.findMany();
      return mapUsersToSchema(users);
    },
    getChallenge: async (_, args, context) => {
      const challenge = await prisma.challenge.findUnique({
        include: { testCases: true, testInputs: true },
        where: { slug: args.slug }
      });
      if (!challenge) {
        // throw new NotFoundException
        throw new Error();
      }

      return challenge;
    },
    getChallenges: async () => {
      return prisma.challenge.findMany({
        include: { testCases: true, testInputs: true }
      });
    }
  },
  Mutation: {
    login: (_: any, args: any, context: any) => {
      const email = args.email;
      validateLoginInput(email);
      context.req.session = { e: `random ${email}` };
      return `random ${email}`;
    }
  }
};

const handleZodError = (err: unknown, req: any, res: any, next: any) => {
  console.log(err);
  next();
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
    context: ({ req, res }): ApolloServerContext => ({
      req,
      res,
      prisma
    }),
    formatError: (err) => {
      // Not sure if this code is already declared in apollo
      if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
        return {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error'
        };
      }

      return err;
    }
  });

  // Addition middleware
  // TODO: re check this secure
  // setting app.set('trust proxy', true)
  // (highly recommend only setting this for local dev,
  // so perhaps app.set('trust proxy', process.env.NODE_ENV !== 'production') may be better)
  // https://github.com/apollographql/apollo-server/issues/5775#issuecomment-936896592
  app.set('trust proxy', true);
  app.use(
    cookieSession({
      name: 'session',
      keys: ['secret-key'],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000,
      // TODO: check if this setting is secure or not
      signed: true,
      secure: true,
      httpOnly: true,
      sameSite: 'none'
    })
  );
  app.use(handleZodError);

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
    cors: {
      credentials: true,
      origin: ['http://localhost:4000', 'https://studio.apollographql.com']
    }
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const main = async () => {
  await connectToDatabase();
  // await createProducer();
  // await createConsumer();

  await startApolloServer(typeDefs, resolvers);
};

main().finally(async () => {
  await prisma.$disconnect();
});
