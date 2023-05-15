import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import movieReducer from './Reducers/MovieReducer';
import profileReducer from './Reducers/ProfileReducer';


const store = configureStore({
  reducer: {
    // MovieReducer에서 default로 export된 값 사용 > 이름은 맘대로 해도된다고!!!!!!!!!
    movie: movieReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
});

export default store;