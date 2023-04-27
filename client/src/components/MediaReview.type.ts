import { HTMLAttributes } from "react";
import { totalMediaProps, Review } from "types/index.types";

export interface Props extends HTMLAttributes<HTMLElement> {
  media: totalMediaProps;
  reviews: Review[];
  mediaType: "movie" | "tv";
}
