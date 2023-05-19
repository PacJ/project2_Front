import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  topRatedList : [],
  topRated : [],
  latestMovies : [],
  themeMovies : [],
  topRatedDirector : [],
  topRatedActor : [],

  contents: {},
  memberReview: {},
  memberWish: {},
  memberLikes: [],
  isReported: null,
  memberFavorite: {},
};

const MovieSlice = createSlice({
  name : 'movie', initialState,

  reducers: {
    // 메인 페이지 추천 리스트
    getMovieList(state, action) {
      state.topRatedList = action.payload.data.topRatedList;
      state.topRated = action.payload.data.topRated;
      state.latestMovies = action.payload.data.latestMovies;
      state.themeMovies = action.payload.data.themeMovies;
      state.topRatedDirector = action.payload.data.topRatedDirector;
      state.topRatedActor = action.payload.data.topRatedActor;
    },

    // 영화 상세정보 컨텐츠
    getMovieContents(state, action) {
      state.contents = action.payload.data;
    },

    // 멤버 rating, comment 정보
    getReviewByMemberId(state, action) {
      state.memberReview = action.payload.data;
    },

    // 멤버 wish 정보
    // 근데 사실 전역으로 관리할 필요는 없음..
    getWishByMemberId(state, action) {
      state.memberWish = action.payload.data;
    },

    // 멤버 likes 정보
    getLikesByMemberId(state, action) {
      state.memberLikes = action.payload.data;
    },

    getFavoriteByMemberId(state, action) {
      state.memberFavorite = action.payload.data;
    },

  },
});

// 함수 자동 완성 가능
export const MovieReducers = MovieSlice.actions;
export default MovieSlice.reducer;