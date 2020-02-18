import Redis from "ioredis";

export const redis = new Redis({
  host: "localhost",
  port: 6379
});

redis.connect(() => console.log("connected to redis"));
