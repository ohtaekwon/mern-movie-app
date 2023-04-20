import { HTMLAttributes } from "react";
import { MediaType, totalMediaProps } from "types/index.types";

export interface Props extends HTMLAttributes<HTMLElement> {
  media: totalMediaProps;
  mediaType: "movie" | "tv" | "people";
}
