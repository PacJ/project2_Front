import axios from 'axios';
import { baseUrl } from '../../Apiurl';
import { MovieReducers } from '../Reducers/MovieReducer';

// dispatch를 매개변수로 주면 내부에서 바로 사용 가능

// 메인 페이지 리스트
function getMovieList() {
  return async (dispatch) => {
    const data = await axios.get(`${baseUrl}/`, {cache:false})
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
    dispatch(MovieReducers.getMovieList({data}));
  };
}

// 영화 상세정보 콘텐츠
function getMovieContents(movie_id) {
  return async (dispatch) => {
    const data = await axios.get(`${baseUrl}/contents/${movie_id}`)
      .then((res) => res.data);
    dispatch(MovieReducers.getMovieContents({data}));
  };
}

function getReviewByMemberId(movie_id, member_id) {
  return async (dispatch) => {
    const data = await axios.get(`${baseUrl}/comment/${movie_id}/${member_id}`)
      .then((res) => res.data);
    dispatch(MovieReducers.getReviewByMemberId({data}));
  }
}

// 코멘트
function postComment(commentDTO) {
  return async () => {
    await axios.post(`${baseUrl}/comment`, commentDTO)
      .then((res) => res.data);
  }
}

function updateComment(commentDTO) {
  return async () => {
    await axios.put(`${baseUrl}/comment`, commentDTO)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

function deleteComment(movie_id, member_id) {
  return async () => {
    await axios.delete(`${baseUrl}/comment/${movie_id}/${member_id}`)
      .then((res) => res.data);
  }
}

// 별점 

// // view action > 뭔가 뭔가 겹치는 작업이 많음..
// function getBoardDetail(num, config) {
//   return async (dispatch) => {
//     const data = await axios.get(`${baseUrl}/board/view/${num}`, config)
//       .then((res) => res.data);
//     dispatch(boardReducers.getBoardDetail({data}));
//   };
// }

// // upload 저장 action
// // stream을 통해서 받을때는 blob으로 선언
// function getBoardDownload(upload) {
//   return async () => {
//     // controller return이 void이면 변수 선언 안해도됨
//     const data = await axios
//       .get(`${baseUrl}/board/contentdownload/${upload}`, { responseType: 'blob' })
//       .then((res) => res.data);
//       // dispatch(boardActions.getBoardDownload(data)); // store에 저장
//       return data; // view에서만 사용
//   };
// }

// // delete action
// function getBoardDelete(num, config) {
//   return async () => {
//     await axios.delete(`${baseUrl}/board/delete/${num}`, config).then((res) => res.data);
//   };
// }

// // write action
// function getBoardWrite(formData, config) {
//   return async () => {
//     await axios.post(`${baseUrl}/board/write`, formData, config)
//       .then((res) => res.data);
//   };
// }

// // update action
// function getBoardUpdate(formData, config) {
//   return async () => {
//     await axios.put(`${baseUrl}/board/update`, formData, config)
//       .then((res) => res.data);
//   }
// }

export const MovieActions = { getMovieList, getMovieContents, getReviewByMemberId, postComment, updateComment, deleteComment };