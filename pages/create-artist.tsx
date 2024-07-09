import CreateArtist from '../components/CreateArtist/CreateArtist';

export default function CreateArtistPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Artist
        </h1>
        <CreateArtist />
      </div>
    </div>
  );
}
