export interface MediaType {
  adult?: boolean;
  genre_ids: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
}

export interface totalMediaProps extends MediaType {
  mediaId?: number;
  mediaTitle?: string;
  mediaPoster?: string;
  profile_path?: string;
  first_air_date?: string;
  mediaRate?: number;
}

export type GenresType = {
  id: number;
  name: string;
};

export interface Poster {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface BackDrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
