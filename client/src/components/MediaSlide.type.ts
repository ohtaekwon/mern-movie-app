import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLElement> {
  mediaType: "movie" | "tv";
  mediaCategory: "popular" | "top_rated";
}
