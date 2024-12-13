import { MongoClient, ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../helper/mongo';

const MONGO_URI = process.env.MONGO_URI;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
        const client = await connectToDatabase();
        const db = client.db('Bookstore');
            
        // Fetch all reviews for the given book ID
        const rawReviews = await db
        .collection('reviews')
        .find({ bookId: new ObjectId(id) })
        .toArray();

        // Fetch all users to cross-check user IDs
        const users = await db.collection('users').find().toArray();

        // Map reviews to include the username by matching userId
        const reviewsWithUsers = rawReviews.map((review) => {
        const user = users.find((user) => user._id.equals(review.userId));
        return { ...review, username: user ? user.username : 'Anonymous' };
        });

        client.close();

        res.status(200).json(reviewsWithUsers);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
        res.status(405).json({ message: 'Method Not Allowed' });
  }
}
