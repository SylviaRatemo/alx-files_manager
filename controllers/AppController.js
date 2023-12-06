// controllers/AppController.js
const RedisUtils = require('../utils/redis');
const DBUtils = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    const redisStatus = RedisUtils.checkRedisConnection();
    const dbStatus = DBUtils.checkDBConnection();

    if (redisStatus && dbStatus) {
      res.status(200).json({ redis: true, db: true });
    } else {
      res.status(500).json({ redis: false, db: false });
    }
  }

  static getStats(req, res) {
    // Placeholder values, replace with your implementation
    const userCount = 12;
    const fileCount = 1231;

    res.status(200).json({ users: userCount, files: fileCount });
  }
}

module.exports = AppController;
