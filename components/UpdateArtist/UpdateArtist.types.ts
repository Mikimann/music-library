interface Artist {
  _id: string;
  name: string;
  albums: Album[];
}

interface Album {
  title: string;
  description: string;
  songs: Song[];
}

interface Song {
  title: string;
  length: string;
}

export interface UpdateArtistProps {
  artist: Artist;
}
