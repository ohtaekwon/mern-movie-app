import { createSlice } from "@reduxjs/toolkit";

/**
 * @description Redux Toolkit을 사용하여 앱 상태(app state)에 대한 Slice를 정의합니다.
 * @argument name createSlice 함수의 첫 번째 매개변수는 slice의 이름으로  "AppState"
 * @argument initialState slice의 초기 상태를 나타내는 객체입니다. 이 slice는  appState를 포함합니다.
 * @argument reducers slice에서 사용할 reducer 함수를 정의하는 객체입니다.
 *
 * @description slice의 action creators으로 프로젝트의 테마를 설정합니다.
 * @method setAppState  state 객체와 action 객체를 인자로 받습니다. state.appState 값을 action.payload 값으로 업데이트합니다.
 *
 * @constant appStateSlice.actions action creators를 객체로 반환합니다.
 * @default appStateSlice.reducer 생성된 reducer 함수를 반환합니다.
 *
 */

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState: {
    authModalOpen: false,
  },
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;
export default authModalSlice.reducer;
