import React from "react";

const usePrevious = (value: "movie" | "tv") => {
  const ref = React.useRef<"movie" | "tv">();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
export default usePrevious;
