import { connectToDatabase } from '../../../lib/mongo';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await connectToDatabase();
      const db = client.db('Bookstore');

      const genres = await db.collection('genres').find({}).toArray();
      // console.log('All Genre API hit')
      res.status(200).json(genres);
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
