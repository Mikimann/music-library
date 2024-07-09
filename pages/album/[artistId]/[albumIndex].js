/* eslint-disable react/prop-types */

import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function getServerSideProps(context) {
  const { artistId, albumIndex } = context.params;
  const client = await clientPromise;
  const db = client.db('musicLibrary');
  const artist = await db
    .collection('albums')
    .findOne({ _id: new ObjectId(artistId) });

  return {
    props: { album: artist?.albums[albumIndex] },
  };
}

export default function Album({ album }) {
  return (
    <div>
      <h1>{album.title}</h1>
      <p>{album.description}</p>
      <h2>Songs</h2>
      <ul>
        {album.songs.map((song, index) => (
          <li key={index}>
            {song.title} - {song.length}
          </li>
        ))}
      </ul>
    </div>
  );
}
