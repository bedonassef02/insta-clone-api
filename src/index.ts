process.loadEnvFile('.env')
import express from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schema';

const app: any = express();

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: ExpressContext) => ({ req }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
