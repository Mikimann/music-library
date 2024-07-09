import { Dispatch, SetStateAction } from 'react';

export interface Song {
  title: string;
  length: string;
}

export interface Album {
  title: string;
  description: string;
  songs: Song[];
}

export interface AlbumsAndSongsFormProps {
  albums: Album[];
  setAlbums: Dispatch<SetStateAction<Album[]>>;
}
