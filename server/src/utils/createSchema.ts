import { buildSchema } from "type-graphql";
import { RegisterResolver } from "../modules/user/Register";

export const createSchema = () =>
  buildSchema({
    //resolvers: [__dirname + "/../modules/*/*.ts"],
    resolvers: [RegisterResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
