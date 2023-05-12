import axios from 'axios';
import { baseUrl } from '../../Apiurl';
import { ProfileReducers } from 'reduxs/Reducers/ProfileReducer';

//프로필페이지 위시&평점 리스트

function getProfileList(member_id) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/profile/${member_id}`, { cache: false })
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
    dispatch(ProfileReducers.getProfileList({ data }));
  };
}

export const ProfileAction = { getProfileList };
