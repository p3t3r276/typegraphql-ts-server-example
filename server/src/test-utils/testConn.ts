import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "test",
    type: "postgres",
    host: "localhost",
    port: 5431,
    username: "postgres",
    password: "postgres",
    database: "typegraphql-example-test",
    synchronize: true,
    dropSchema: drop,
    entities: [__dirname + "/.../entity/*.*"]
  });
};
