interface Song {
  title: string;
  length: string;
}

export interface Album {
  title: string;
  description: string;
  songs: Song[];
}
