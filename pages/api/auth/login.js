import { connectToDatabase } from '../../../lib/mongo';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const client = await connectToDatabase();
      const db = client.db('Bookstore');

      const user = await db.collection('users').findOne({ username, password });

      if (user) {
        res.status(200).json({ token: 'fake-token', email: user.email });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }

      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
