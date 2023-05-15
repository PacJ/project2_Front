import { createSlice } from '@reduxjs/toolkit';
let initialState = {
  wishList: [],
  ratingList: [],
  memberInfo: {}
};

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,

  reducers: {
    //프로필페이지 위시&평점 리스트
    getProfileList(state, action) {
      state.wishList = action.payload.data.wishList;
      state.ratingList = action.payload.data.ratingList;
      state.memberInfo = action.payload.data.memberInfo;
    },
  },
});

export const ProfileReducers = ProfileSlice.actions;
export default ProfileSlice.reducer;
