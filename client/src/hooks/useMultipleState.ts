import React from "react";

const reducer = (state: any, action: any) => {
  // console.log("state", state, "action", action);
  return {
    ...state,
    [action.name]: action.value,
  };
};

/**
 * @description
 * 여러개의 상태(state)를 관리하기 위한 훅으로, 초기값에 관리할 상태(State)를 넣어주고, dispatch를 통해 name에 state명을 넣고 value에 변경된 value를 넣어줍니다.
 *
 */

const useMultipleState = (initialState = {}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, dispatch] as const;
};

export default useMultipleState;
