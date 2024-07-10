import { useRouter } from 'next/router';
import { DeleteArtistProps } from './DeleteArtist.types';
import Button from '@/common/Button/Button';

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
    <Button
      text="Delete artist"
      className="btn hover:bg-red-600 bg-red-500 focus:ring-red-500 "
      onClick={handleDelete}
    />
  );
}
