import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ isAuth, RouteComponent }) => {
  const isLogin = localStorage.getItem('isLogin');
  const authRole = localStorage.getItem('authRole');
  // console.log(isAuth, isLogin);

  // 인증이 반드시 필요한 페이지이고 인증이 된 페이지
  if (isAuth && isLogin) {
    if (authRole === '사용자') {
      return <Navigate to='/' />;
    }
    return <RouteComponent />;
  }

  // 인증이 반드시 필요한 페이지이고 인증이 안된 페이지
  else if (isAuth && !isLogin) {
    return <Navigate to='/adminlogin' />;
  }

  //인증이 필요하지 않은 페이지
  else {
    return <RouteComponent />;
  }
  // return <Navigate to='/' />;
};

export default AdminPrivateRoute;