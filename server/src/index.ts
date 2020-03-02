import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import session from "express-session";
import { createConnection } from "typeorm";
import connectRedis from "connect-redis";
import cors from "cors";
import queryComplexity, {
  fieldConfigEstimator,
  simpleEstimator
} from "graphql-query-complexity";

import { redis } from "./redis";
import { createSchema } from "./utils/createSchema";

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
    //validationRules: [
    //queryComplexity({
    //// maximum allowed query complexity, queries above this threshold will be rejected
    //maximumComplexity: 8,
    //variables: {},
    //onComplete: (complexity: number) => {
    //console.log("Query complexity:", complexity);
    //},
    //estimators: [
    //fieldConfigEstimator(),
    //simpleEstimator({ defaultComplexity: 1 })
    //]
    //}) as any
    //]
  });

  const app = Express();

  const redisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  app.use(
    session({
      store: new redisStore({
        client: redis
      }),
      name: "qid",
      secret: "asdhajdhad",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 35 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
  });
};

main();
