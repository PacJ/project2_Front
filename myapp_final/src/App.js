import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/Member/Register';
import BaseLayout from 'components/Layout/BaseLayout';
import Login from 'components/Member/Login';
import Home from 'components/Home';
import SearchPage from 'components/Search/SearchPage';
import ProfilePage from 'components/Profile/ProfilePage';
import Contents from 'components/Contents/ContentsPage';
import ReviewPage from 'components/Review/ReviewPage';
import AnalysisPage from 'components/Analysis/AnalysisPage';
import GenreSelect from 'components/Member/GenreSelect';
import PrivateRoute from 'access/PrivateRoute';
import LogOut from 'components/Member/Logout';
import CastProfile from 'components/CastProfile/CastProfile';
import Notice from 'components/Notice/Notice';
import AdminRegister from 'components/Admin/AdminRegister';
import AdminLogin from 'components/Admin/AdminLogin';
import AdminEditInfo from 'components/Admin/AdminEditInfo';
import AdminPage from 'components/Admin/AdminPage';
import AdminPrivateRoute from 'access/AdminPrivateRoute';
import ProfileListMore from 'components/Profile/ProfileListMore';
import RecList from 'components/Profile/RecList';
import NoticePage from 'components/Notice/NoticePage';
import EditNotice from 'components/Notice/EditNotice';
import ModifyNotice from 'components/Notice/ModifyNotice';
import NewAdminPage from 'components/Admin/NewAdminPage';

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PrivateRoute isAuth={false} RouteComponent={Login} />} />
        <Route path="/logout" element={<PrivateRoute isAuth={true} RouteComponent={LogOut} />} />
        <Route path="/register" element={<PrivateRoute isAuth={false} RouteComponent={RegisterPage} />} />
        <Route path="/search/:query" element={<PrivateRoute isAuth={false} RouteComponent={SearchPage} />} />
        <Route path="/profile/:member_id" element={<PrivateRoute isAuth={false} RouteComponent={ProfilePage} />} />
        <Route path='/profilelistmore/:path/:member_id' element={<PrivateRoute isAuth={false} RouteComponent={ProfileListMore} />}/>
        <Route path='/genreselect' element={<PrivateRoute isAuth={false} RouteComponent={GenreSelect} />} />
        <Route path="/analysis/:member_id" element={<PrivateRoute isAuth={false} RouteComponent={AnalysisPage} />} />
        <Route path="/contents/:movie_id" element={<PrivateRoute isAuth={false} RouteComponent={Contents} />} />
        <Route path="/review" element={<PrivateRoute isAuth={true} RouteComponent={ReviewPage} />} />
        <Route path="/cast/:profileType/:id" element={<PrivateRoute isAuth={false} RouteComponent={CastProfile}/>} />
        <Route path="/recommend/:member_id" element={<PrivateRoute isAuth={false} RouteComponent={RecList} />}/>
        <Route path='/notice' element={<PrivateRoute isAuth={false} RouteComponent={Notice} />} />

        <Route path='/adminlogin' element={<AdminPrivateRoute isAuth={false} RouteComponent={AdminLogin} />} />
        <Route path='/adminregister' element={<AdminPrivateRoute isAuth={false} RouteComponent={AdminRegister} />} />
        <Route path='/admineditinfo' element={<AdminPrivateRoute isAuth={true} RouteComponent={AdminEditInfo} />} />
        <Route path='/adminpage' element={<AdminPrivateRoute isAuth={true} RouteComponent={NewAdminPage} />} />
        <Route path='/adminnotice' element={<AdminPrivateRoute isAuth={true} RouteComponent={NoticePage} />} />
        <Route path='/admineditnotice' element={<AdminPrivateRoute isAuth={true} RouteComponent={EditNotice} />} />
        <Route path='/adminmodifynotice/:notice_id' element={<AdminPrivateRoute isAuth={true} RouteComponent={ModifyNotice} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
