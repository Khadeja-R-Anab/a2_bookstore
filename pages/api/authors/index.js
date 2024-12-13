import { connectToDatabase } from '../../../helper/mongo';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await connectToDatabase();
      const db = client.db('Bookstore');

      const authors = await db.collection('authors').find({}).toArray();

      res.status(200).json(authors);
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
