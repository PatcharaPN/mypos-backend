const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.error("Error when connecting to redis");
  }
};

module.exports = { redisClient, connectRedis };
