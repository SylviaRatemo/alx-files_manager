const sha1 = require('sha1');
const { MongoClient } = require('mongodb');

let db;

async function connectToDatabase() {
  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');
    db = client.db('your_database_name'); // Replace 'your_database_name' with your actual database name
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

const UsersController = {
  postNew: async (req, res) => {
    try {
      if (!db) {
        await connectToDatabase();
      }

      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      const users = db.collection('users');

      // Check if email already exists
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exists' });
      }

      // Hash the password (you might want to use a better hashing library)
      const hashedPassword = sha1(password);

      // Create a new user
      const newUser = {
        email,
        password: hashedPassword,
      };

      // Save the user to the collection
      const result = await users.insertOne(newUser);

      // Return the new user details
      return res.status(201).json({ id: result.insertedId, email });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = UsersController;
