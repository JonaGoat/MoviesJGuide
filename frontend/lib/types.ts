export type MovieListItem = {
  id: string;
  title: string;
  year: number;
  phase: string;
  heroKey: string;
  color: string;
  chronoOrder: number;
  releaseOrder: number;
  runtime: string | null;
  rating: number | null;
  description: string | null;
  trailerUrl: string | null;
  posterPath: string;
  bannerPath: string;
  isUpcoming: boolean;
  genres: string[];
};

export type MovieDetail = MovieListItem;

export type Phase = {
  id: string;
  name: string;
  order: number;
};

export type Playlist = {
  id: string;
  name: string;
  itemCount: number;
};

export type PlaylistItem = {
  id: string;
  movieId: string;
  order: number;
};
