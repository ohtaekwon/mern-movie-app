import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLElement> {
  /**
   * App 상태의 State
   * @default ""
   */
  switchAuthState: () => void;
}
