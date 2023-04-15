import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";
import appStateSlice from "./features/appStateSlice";

/**
 * store는 애플리케이션의 상태를 관리하는 중앙 집중식 저장소
 * @description createSlice 실제 Reducer의 동작
 * @description configureStore store의 구성성질
 *
 * App에서 state.themeMode 사용해 저장된 Reducer의 값을 가져올 수 있다.
 */
const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type { user: userSlice,themeMode: themeModeSlice,  authModal: authModalSlice, globalLoading: globalLoadingSlice,  appState: appStateSlice,}
export type AppDispatch = typeof store;
