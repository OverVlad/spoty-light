export type Playlist = {
  id: string;
  title: string;
  description?: string;
  tracks: Track[];
};

export type Track = {
  id: string;
  name: string;
  cover: string;
  artist: string;
  album: string;
  releaseData: Date;
};
