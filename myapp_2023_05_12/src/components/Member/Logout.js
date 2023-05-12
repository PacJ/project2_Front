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
    localStorage.clear();

    window.location.replace('/');
  });
}

export default LogOut;