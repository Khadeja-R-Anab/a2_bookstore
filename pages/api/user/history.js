import { connectToDatabase } from '../../../lib/mongo';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const client = await connectToDatabase();
      const db = client.db('Bookstore');

      const history = await db.collection('history').find({ userId }).toArray();

      res.status(200).json(history);
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { userId, search } = req.body;

    try {
      const client = await connectToDatabase();
      const db = client.db('Bookstore');

      await db.collection('history').insertOne({ userId, search, timestamp: new Date() });

      res.status(201).json({ message: 'Search added to history' });
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
