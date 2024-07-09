import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req.query;
    if (typeof query !== 'string') {
      res.status(400).json({ error: 'Invalid query parameter' });
      return;
    }

    try {
      const client = await clientPromise;
      const db = client.db('musicLibrary');
      const artists = await db
        .collection('albums')
        .find(
          { name: { $regex: new RegExp(query, 'i') } },
          { projection: { name: 1 } }
        )
        .toArray();

      res.status(200).json(artists);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch artists' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
