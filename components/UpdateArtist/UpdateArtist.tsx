import { ChangeEvent, FormEvent, useState } from 'react';
import { UpdateArtistProps } from './UpdateArtist.types';
import AlbumsAndSongsForm from '../AlbumAndSongsForm/AlbumAndSongsForm';

export default function UpdateArtist({ artist }: UpdateArtistProps) {
  const [name, setName] = useState(artist.name);
  const [albums, setAlbums] = useState(artist.albums);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/artist/${artist._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, albums }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Artist updated', data);
      } else {
        console.log('Failed to update artist');
      }
    } catch (error) {
      console.log('An error occurred while updating the artist:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Edit the fields if you wish to update the artist then press the Update
        button at the bottom:
      </h3>
      <input
        type="text"
        placeholder="Artist Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AlbumsAndSongsForm albums={albums} setAlbums={setAlbums} />
      <button
        type="submit"
        className="text-xl w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-5"
      >
        Update
      </button>
    </form>
  );
}
