export type Playlist = {
  id: string;
  title: string;
  description?: string;
  tracks: Track[];
};

type AlbumImage = {
  height: number;
  width: number;
  url: string;
};

type Artist = {
  id: string;
  name: string;
};

export type Track = {
  id: string;
  name: string;
  preview_url: string;
  artist: Artist[];
  album: {
    name: string;
    release_date: string;
    images: AlbumImage[];
  };
};
