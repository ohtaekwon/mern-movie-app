import { Action } from "@reduxjs/toolkit";
import React from "react";

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const useMultipleState = (initialState = {}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, dispatch] as const;
};

export default useMultipleState;

/**
 *
 * State
 */
// {
//   "title": "달링 인 더 프랑키스",
//   "posterPath": "https://image.tmdb.org/t/p/w500/xASxdoixSJwEemDJC1J8HxtAzz9.jpg",
//   "releaseDate": "",
//   "rate": 8.7,
//   "first_air_date": "2018"
// }
