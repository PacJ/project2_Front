import axios from 'axios';
import { useEffect } from 'react'

const LogOut = () => {
  useEffect(() => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('member_id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('nickname');
    localStorage.removeItem('authRole');
    localStorage.removeItem('isLogin');

    if (localStorage.getItem('access_token') !== null) {
      axios.post('https://kapi.kakao.com/v1/user/unlink', null, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          // 요청 성공 시 처리할 작업
          console.log(response.data);

        })
        .catch(error => {
          // 요청 실패 시 처리할 작업
          console.error(error);
        });
    }
    if (localStorage.getItem('naver') !== null) {
      window.location.href = 'https://nid.naver.com/nidlogin.logout';
      localStorage.clear();
    }
    localStorage.clear();


    window.location.replace('/');
  });
}

export default LogOut;