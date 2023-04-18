import { HTMLAttributes } from "react";

export interface ScrollAppProps extends HTMLAttributes<HTMLElement> {
  window?: Window | any;
}
