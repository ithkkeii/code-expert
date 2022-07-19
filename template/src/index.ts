import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { __prod__ } from "./constants";

const prisma = new PrismaClient({
  log: __prod__ ? [] : ["query", "info", "warn", "error"],
});

const connectToDatabase = async () => {
  console.log("Connect to the database...");
  await prisma.$connect();
  console.log("Database connected!");
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

const main = async () => {
  await connectToDatabase();

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context: () => ({ em: prisma }),
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

main().finally(async () => {
  await prisma.$disconnect();
});
