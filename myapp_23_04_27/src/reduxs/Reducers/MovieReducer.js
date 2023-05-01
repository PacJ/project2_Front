import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  topRatedList: [],
  topRatedClassic: [],
  searchedList: [],
  contents: {},

  pv: { currentPage: 1 },
  boardDetail: {},
  boardFile: null,
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,

  reducers: {
    // 메인 페이지 추천 리스트
    getMovieList(state, action) {
      state.topRatedList = action.payload.data.topRatedList;
      state.topRatedClassic = action.payload.data.topRatedClassic;
    },

    getMovieContents(state, action) {
      state.contents = action.payload.data;
    },

    // view reducer
    getBoardDetail(state, action) {
      state.boardDetail = action.payload.data;
    },

    // upload > state에 저장하지 않아도됨
    getBoardDownload(state, action) {
      state.boardFile = action.payload.data;
    },

    // 검색 리스트
    getSearchList(state, action) {
      state.searchedList = action.payload.data;
    },
  },
});

// 함수 자동 완성 가능
export const MovieReducers = MovieSlice.actions;
export default MovieSlice.reducer;
