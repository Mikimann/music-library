import {
  AlbumsAndSongsFormProps,
  Album,
  Song,
} from './AlbumAndSongsForm.types';
import Button from '@/common/Button/Button';

export default function AlbumsAndSongsForm({
  albums,
  setAlbums,
}: AlbumsAndSongsFormProps) {
  const handleAlbumChange = (
    index: number,
    key: keyof Album,
    value: string
  ) => {
    const newAlbums = [...albums];
    if (key === 'title' || key === 'description') {
      newAlbums[index][key] = value;
    }
    setAlbums(newAlbums);
  };

  const handleSongChange = (
    albumIndex: number,
    songIndex: number,
    key: keyof Song,
    value: string
  ) => {
    const newAlbums = [...albums];
    newAlbums[albumIndex].songs[songIndex][key] = value;
    setAlbums(newAlbums);
  };

  const addAlbum = () => {
    setAlbums([
      ...albums,
      { title: '', description: '', songs: [{ title: '', length: '' }] },
    ]);
  };

  const addSong = (albumIndex: number) => {
    const newAlbums = [...albums];
    newAlbums[albumIndex].songs.push({ title: '', length: '' });
    setAlbums(newAlbums);
  };

  const deleteSong = (albumIndex: number, songIndex: number) => {
    const newAlbums = [...albums];
    newAlbums[albumIndex].songs.splice(songIndex, 1);
    setAlbums(newAlbums);
  };

  const deleteAlbum = (albumIndex: number) => {
    const newAlbums = [...albums];
    newAlbums.splice(albumIndex, 1);
    setAlbums(newAlbums);
  };

  return (
    <div className="space-y-6">
      {albums.map((album, albumIndex) => (
        <div key={albumIndex} className="bg-white rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Album {albumIndex + 1}
          </h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Album title"
              value={album.title}
              onChange={(e) =>
                handleAlbumChange(albumIndex, 'title', e.target.value)
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              value={album.description}
              onChange={(e) =>
                handleAlbumChange(albumIndex, 'description', e.target.value)
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={10}
              placeholder="Album description"
              required
            ></textarea>
          </div>
          {album.songs.map((song, songIndex) => (
            <div
              key={songIndex}
              className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4"
            >
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="Song title"
                  value={song.title}
                  onChange={(e) =>
                    handleSongChange(
                      albumIndex,
                      songIndex,
                      'title',
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Song length"
                  value={song.length}
                  onChange={(e) =>
                    handleSongChange(
                      albumIndex,
                      songIndex,
                      'length',
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <Button
                text="Delete song"
                type="button"
                onClick={() => deleteSong(albumIndex, songIndex)}
                className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
              />
            </div>
          ))}
          <div className="flex space-x-4">
            <Button
              type="button"
              text="Add song"
              onClick={() => addSong(albumIndex)}
              className="text-xl w-full text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 bg-green-500  hover:bg-green-600  focus:ring-green-500"
            />
            <Button
              type="button"
              onClick={() => deleteAlbum(albumIndex)}
              text="Delete album"
              className="text-xl w-full text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 bg-red-500 hover:bg-red-600 focus:ring-red-500"
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        text="Add album"
        onClick={addAlbum}
        className="text-xl w-full text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 bg-green-500  hover:bg-green-600 focus:ring-green-500"
      />
    </div>
  );
}
