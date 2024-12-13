import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

export async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}
