import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * @description Redux Toolkit을 사용하여 ThemeMode를 설정하는 slice
 * @argument name createSlice 함수의 첫 번째 매개변수는 slice의 이름으로 "ThemeMode"
 * @argument initialState slice의 초기 상태를 나타내는 객체입니다. 이 slice는 themeMode를 포함합니다.
 * @argument reducers slice에서 사용할 reducer 함수를 정의하는 객체입니다.
 *
 * @description slice의 action creators으로 프로젝트의 테마를 설정합니다.
 * @method setThemeMode  state와 action 매개 변수를 받습니다. state.themeMode 값을 action.payload로 업데이트합니다.
 *
 * @constant themeModeSlice.actions action creators를 객체로 반환합니다.
 * @default themeModeSlice.reducer 생성된 reducer 함수를 반환합니다.
 *
 */

const initialState = {
  themeMode: "dark",
} as { themeMode: "dark" | "light" };

export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<"dark" | "light">) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;
