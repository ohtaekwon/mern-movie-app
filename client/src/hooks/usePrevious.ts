import React from "react";

const usePrevious = (value: any) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
export default usePrevious;
