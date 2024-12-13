import { connectToDatabase } from '../../../helper/mongo';

export default async function handler(req, res) {
  const { method } = req;

  try {
    const client = await connectToDatabase();
    const db = client.db('Bookstore');

    if (method === 'GET') {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const history = await db
        .collection('history')
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();

      res.status(200).json(history);
    } else if (method === 'POST') {
      const { userId, search } = req.body;
      if (!userId || !search) {
        return res.status(400).json({ error: 'User ID and search query are required' });
      }

      await db.collection('history').insertOne({
        userId,
        search,
        timestamp: new Date(),
      });

      res.status(201).json({ message: 'Search added to history' });
    } else if (method === 'DELETE') {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      await db.collection('history').deleteMany({ userId });
      res.status(200).json({ message: 'Search history cleared' });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }

    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
