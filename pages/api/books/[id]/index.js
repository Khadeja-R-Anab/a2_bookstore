import { connectToDatabase } from '../../../../helper/mongo';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      console.log("Connecting")
      const client = await connectToDatabase();
      const db = client.db('Bookstore');
      console.log(id)

      const book = await db.collection('books').findOne({ _id: new ObjectId(id) });
      console.log(book);

      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }

      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
