import { createSlice } from "@reduxjs/toolkit";

/**
 * @description Redux Toolkit을 사용하여 user와 listFavorites를 포함하는 초기 상태와 함께 userSlice라는 Redux slice를 생성합니다.
 * @argument name createSlice 함수의 첫 번째 매개변수는 slice의 이름으로 "User"
 * @argument initialState slice의 초기 상태를 나타내는 객체입니다. 이 slice는 user와 listFavorites를 포함합니다.
 * @argument reducers slice에서 사용할 reducer 함수를 정의하는 객체입니다.
 *
 * @description slice의 action creators으로 각각 유저 정보를 설정하거나, 즐겨찾기 목록을 업데이트하고, 즐겨찾기를 추가하거나 제거하는 역할을 합니다.
 * @method setUser  state.user 값을 업데이트, localStorage에 사용자의 인증 토큰을 저장하거나 삭제합니다.
 * @method setListFavorites state.listFavorites 값을 업데이트합니다.
 * @method addFavorite addFavorite reducer는 state.listFavorites 배열의 앞부분에 action.payload를 추가합니다.
 * @method removeFavorite  removeFavorite reducer는 state.listFavorites 배열에서 mediaId가 일치하는 요소를 제거합니다.
 *
 * @constant userSlice.actions action creators를 객체로 반환합니다.
 * @default userSlice.reducer 생성된 reducer 함수를 반환합니다.
 *
 */

const initialState = {
  user: null,
  listFavorites: [],
} as {
  user: null;
  listFavorites: {
    mediaId: string;
  }[];
};

export const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token) {
          const userToken = action.payload.token;
          localStorage.setItem("actkn", userToken);
        }
      }
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorites: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorites } =
  userSlice.actions;

export default userSlice.reducer;
