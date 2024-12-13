export default function handler(req, res) {
    if (req.method === 'POST') {
      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  