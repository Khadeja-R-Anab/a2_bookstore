import { connectToDatabase } from '../../../helper/mongo';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // console.log(req.body)
      const client = await connectToDatabase();
      const db = client.db('Bookstore');

      const user = await db.collection('users').findOne({ email: email, password: password });

      // console.log(user)

      if (user) {
        res.status(200).json({ token: 'fake-token', email: user.email, id: user._id });
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
