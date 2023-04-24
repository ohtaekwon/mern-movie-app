import { HTMLAttributes } from "react";
import { totalMediaProps } from "types/index.types";

export interface Props extends HTMLAttributes<HTMLElement> {
  media: totalMediaProps;
  reviews: any[];
  mediaType: "movie" | "tv";
}
