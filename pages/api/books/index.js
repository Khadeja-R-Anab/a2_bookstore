import { connectToDatabase } from '../../../helper/mongo';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // console.log("CONNECTING TO DB")
      const client = await connectToDatabase();
      const db = client.db('Bookstore');
      // console.log("CONNECTED TO DB")
      const books = await db.collection('books').find({}).toArray();
      // console.log(books)
      res.status(200).json(books);
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
