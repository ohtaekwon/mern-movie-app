import { GenresType, MediaType } from "types/index.types";

export type Error = { error: { code: number; message: string } };

export interface MediaResponse {
  page: number;
  results: MediaType[];
  total_pages: number;
  total_results: number;
}
export interface GenresResponse {
  genres: GenresType[];
}

export interface MediaDetailResponse extends MediaType {
  backdrop_path: string;
  belong_to_collection: {
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  credits: any;
  genres: { id: number; name: string }[];
  isFavorite: boolean;
}
