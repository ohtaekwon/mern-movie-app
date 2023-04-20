import React from "react";

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const useStateReducer = (initialState = {}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, dispatch] as const;
};

export default useStateReducer;
