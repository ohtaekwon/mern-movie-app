export interface User {
  displayName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

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
/**
 * @description 장르
 */
export type GenresType = {
  id: number;
  name: string;
};
/**
 * @description 영화 포스터
 */

export interface Poster {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
/**
 * @description 배경 이미지
 */
export interface BackDrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
/**
 * @description 출연 배우
 */

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
/**
 * @description 비디오 타입
 */
export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: "YouTube";
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Review extends User {
  user: User;
  content: string;
  mediaType: "movie" | "tv";
  mediaId: string | number;
  mediaTitle: string;
  mediaPoster: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
