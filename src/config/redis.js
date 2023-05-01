const redis = require("redis");

const client = redis.createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
(async () => {
  client.connect();
  client.on("connect", () => {
    console.log("connected to db redis ...");
  });
})();

module.exports = client;
