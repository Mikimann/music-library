import { useRouter } from 'next/router';
import { DeleteArtistProps } from './DeleteArtist.types';

export default function DeleteArtist({ artistId }: DeleteArtistProps) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/artist/${artistId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        console.log('Artist deleted');
        router.push('/');
      } else {
        console.log('Failed to delete artist');
      }
    } catch (error) {
      console.log('An error occurred while deleting the artist:', error);
    }
  };

  return (
    <button
      className=" text-xl w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      onClick={handleDelete}
    >
      Delete artist
    </button>
  );
}
