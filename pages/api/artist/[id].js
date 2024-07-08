import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('musicLibrary');
  const { id } = req.query;

  if (req.method === 'PUT') {
    const updatedArtist = req.body;
    const result = await db
      .collection('albums')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedArtist });
    res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    const result = await db
      .collection('albums')
      .deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
