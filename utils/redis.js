// utils/redis.js

const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Display any error in the console
    this.client.on('error', (err) => {
      console.error(`Redis Client Error: ${err}`);
    });
  }

  isAlive() {
    // Check if the connection to Redis is successful
    return this.client.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      // Retrieve the value for the given key from Redis
      const value = await getAsync(key);
      return value;
    } catch (error) {
      console.error(`Error getting value from Redis for key ${key}: ${error}`);
      throw error;
    }
  }

  async set(key, value, duration) {
    try {
      // Store the value in Redis with an expiration set by the duration argument
      await this.client.set(key, value, 'EX', duration);
    } catch (error) {
      console.error(`Error setting value in Redis for key ${key}: ${error}`);
      throw error;
    }
  }

  async del(key) {
    try {
      // Remove the value in Redis for the given key
      await this.client.del(key);
    } catch (error) {
      console.error(`Error deleting value in Redis for key ${key}: ${error}`);
      throw error;
    }
  }
}

// Create and export an instance of RedisClient called redisClient
const redisClient = new RedisClient();
module.exports = redisClient;
