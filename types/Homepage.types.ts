interface Song {
  title: string;
  length: string;
}

interface Album {
  title: string;
  description: string;
  songs: Song[];
}

interface Artist {
  _id: string;
  name: string;
  albums: Album[];
}

export interface HomeProps {
  artists: Artist[];
}
