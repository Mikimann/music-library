import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db('musicLibrary');
    const { name, albums } = req.body;

    const newArtist = {
      name,
      albums,
    };

    const result = await db.collection('albums').insertOne(newArtist);
    res.status(201).json(result);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
