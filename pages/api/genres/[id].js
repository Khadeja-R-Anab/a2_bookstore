import { connectToDatabase } from '../../../lib/mongo';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const client = await connectToDatabase();
      const db = client.db('Bookstore');

      // Get books by genre
      const books = await db.collection('books').find({ genre: id }).toArray();

      res.status(200).json(books);
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
