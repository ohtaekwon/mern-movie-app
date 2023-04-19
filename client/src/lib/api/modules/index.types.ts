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
