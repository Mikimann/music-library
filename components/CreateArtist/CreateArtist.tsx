import { ChangeEvent, FormEvent, useState } from 'react';
import { Album } from './CreateArtist.types';
import AlbumsAndSongsForm from '../AlbumAndSongsForm/AlbumAndSongsForm'; // Adjust the import path as necessary
import { useRouter } from 'next/router';

export default function CreateArtist() {
  const [name, setName] = useState<string>('');
  const [albums, setAlbums] = useState<Album[]>([
    { title: '', description: '', songs: [{ title: '', length: '' }] },
  ]);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/createArtist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, albums }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Artist created', data);
        setName('');
        setAlbums([
          { title: '', description: '', songs: [{ title: '', length: '' }] },
        ]);
        router.push('/');
      } else {
        console.log('Failed to create artist');
      }
    } catch (error) {
      console.log('An error occurred while creating the artist:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Artist name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        required
        className="w-full border border-gray-300 my-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AlbumsAndSongsForm albums={albums} setAlbums={setAlbums} />
      <button
        type="submit"
        className="w-full my-2 text-xl bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create
      </button>
    </form>
  );
}
