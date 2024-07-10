import { ChangeEvent, FormEvent, useState } from 'react';
import { Album } from './CreateArtist.types';
import AlbumsAndSongsForm from '../AlbumAndSongsForm/AlbumAndSongsForm';
import { useRouter } from 'next/router';
import Button from '@/common/Button/Button';

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
        className="font-body w-full border border-gray-300 my-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AlbumsAndSongsForm albums={albums} setAlbums={setAlbums} />
      <Button
        text="Create"
        type="submit"
        className="btn font-body bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 mt-5"
      />
    </form>
  );
}
