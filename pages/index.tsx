import SearchAutocompleteBar from '@/components/SearchAutocompleteBar/SearchAutocomplete';
import clientPromise from '../lib/mongodb';
import Link from 'next/link';
import { HomeProps } from '@/types/Homepage.types';

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db('musicLibrary');
  const artists = await db.collection('albums').find({}).toArray();

  return {
    props: { artists: JSON.parse(JSON.stringify(artists)) },
  };
}

export default function Home({ artists }: HomeProps) {
  return (
    <div className="w-screen h-screen flex flex-col items-center relative bg-green-200">
      <h1 className="font-heading px-4 py-2 text-4xl sm:text-5xl lg:text-6xl mt-10 text-slate-600 text-center">
        Artists
      </h1>

      <div className="mt-10 w-full px-4">
        <SearchAutocompleteBar />
        <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center pt-5">
          {artists.map((artist) => (
            <li key={artist._id} className="mx-2 my-2">
              <a
                className="font-body block text-lg sm:text-xl md:text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-300"
                href={`/artist/${artist._id}`}
              >
                {artist.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/create-artist"
        className="mt-4 font-body bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 text-2xl"
      >
        Create New Artist
      </Link>
    </div>
  );
}
