import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";
import appStateSlice from "./features/appStateSlice";

/**
 * Configure Store
 * @description configureStores는 store의 구성성질로 애플리케이션의 상태를 관리하는 중앙 집중식 저장소를 의미한다.
 * Redux의 createStore() 대신 RTK에서는 store를 생성한다. 여기서 여러가지 미들웨어 설정을 할 수 있다.
 * store는 애플리케이션의 상태를 관리하는 중앙 집중식 저장소를 의미합니다.
 * @argument reducer 전체 애플리케이션 상태를 관리하는 Reducer 함수를 넣는다. RTK의 configureStore 에서는 Reducer를 store에 전달하도록 합니다.
 *
 * Create Slice
 * @description createSlice() 실제 Reducer의 동작을 하는 함수로 reducer 함수와 Action 생성 함수를 한 번에 생성하도록 한다.
 * 각각의 slice는 @argument name에 따라 생성이 되고 @argument initialState 초깃값을 갖고 @argument reducers Action Type에 따라 실행될 여러 개의 reducer들로 이뤄진다.
 *
 */
const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
  },
  // middleware:
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type { user: userSlice,themeMode: themeModeSlice,  authModal: authModalSlice, globalLoading: globalLoadingSlice,  appState: appStateSlice,}
export type AppDispatch = typeof store;
