/* eslint-disable react/prop-types */

import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import UpdateArtist from '../../components/UpdateArtist/UpdateArtist';
import DeleteArtist from '../../components/DeleteArtist/DeleteArtist';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = await clientPromise;
  const db = client.db('musicLibrary');
  const artist = await db
    .collection('albums')
    .findOne({ _id: new ObjectId(id) });

  return {
    props: { artist: JSON.parse(JSON.stringify(artist)) },
  };
}

export default function Artist({ artist }) {
  return (
    <div className=" max-w-4xl mx-auto p-6 bg-white shadow-sm border border-gray-400 rounded-lg my-20 px-20">
      <div>
        <UpdateArtist artist={artist} />
      </div>
      <div className="mb-6">
        <DeleteArtist artistId={artist._id} />
      </div>
      <ul className="space-y-2"></ul>
    </div>
  );
}
