import theme from "@/styles/theme";

declare module "@emotion/react" {
  export interface Theme {
    colors: typeof theme.colors;
    fontSize: typeof theme.fontSize;
    lineHeight: typeof theme.lineHeight;
    breakpoint: typeof theme.breakpoint;
    mediaQuery: typeof theme.mediaQuery;
  }
}
