export type Playlist = {
  id: string;
  title: string;
  description?: string;
  songs: Song[];
};

export type Song = {
  id: string;
  name: string;
  cover: string;
  artist: string;
  album: string;
  releaseData: Date;
};
