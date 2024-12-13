import { connectToDatabase } from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const client = await connectToDatabase();
      const db = client.db('Bookstore');

      // Get author details
      const author = await db.collection('authors').findOne({ _id: new ObjectId(id) });
      if (!author) {
        res.status(404).json({ message: 'Author not found' });
        client.close();
        return;
      }

      // Get books written by this author
      const books = await db.collection('books').find({ authorId: new ObjectId(id) }).toArray();

      res.status(200).json({ author, books });
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
