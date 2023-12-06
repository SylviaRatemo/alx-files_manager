// utils/db.js

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect((err) => {
      if (err) {
        console.error(`MongoDB Connection Error: ${err}`);
      } else {
        console.log('Connected to MongoDB');
      }
    });
  }

  isAlive() {
    // Check if the connection to MongoDB is successful
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      // Access the 'users' collection and retrieve the count
      const usersCollection = this.client.db().collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error(`Error counting documents in 'users' collection: ${error}`);
      throw error;
    }
  }

  async nbFiles() {
    try {
      // Access the 'files' collection and retrieve the count
      const filesCollection = this.client.db().collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error(`Error counting documents in 'files' collection: ${error}`);
      throw error;
    }
  }
}

// Create and export an instance of DBClient called dbClient
const dbClient = new DBClient();
module.exports = dbClient;
