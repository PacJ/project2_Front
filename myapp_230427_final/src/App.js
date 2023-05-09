import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./components/Member/Register";
import BaseLayout from "components/Layout/BaseLayout";
import Login from "components/Member/Login";
import Home from "components/Home";
import SearchPage from "components/Search/SearchPage";
import ProfilePage from "components/Profile/ProfilePage";
import Contents from "components/Contents/ContentsPage";
import ReviewPage from "components/Review/ReviewPage";
import AnalysisPage from "components/Analysis/AnalysisPage";
import CommentPage from "components/Comment/CommentPage";
import GenreSelect from "components/Member/GenreSelect";
import PrivateRoute from "access/PrivateRoute";
import LogOut from "components/Member/Logout";
import CastProfile from "components/CastProfile/CastProfile";
import RecList from "components/Profile/RecList";

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<PrivateRoute isAuth={false} RouteComponent={Login} />}
        />
        <Route
          path="/logout"
          element={<PrivateRoute isAuth={true} RouteComponent={LogOut} />}
        />
        <Route
          path="/register"
          element={
            <PrivateRoute isAuth={false} RouteComponent={RegisterPage} />
          }
        />
        <Route
          path="/search/:query"
          element={<PrivateRoute isAuth={false} RouteComponent={SearchPage} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute isAuth={true} RouteComponent={ProfilePage} />}
        />
        <Route
          path="/genreselect"
          element={<PrivateRoute isAuth={true} RouteComponent={GenreSelect} />}
        />
        <Route
          path="/analysis/:member_id"
          element={
            <PrivateRoute isAuth={false} RouteComponent={AnalysisPage} />
          }
        />
        <Route
          path="/contents/:movie_id"
          element={<PrivateRoute isAuth={false} RouteComponent={Contents} />}
        />
        <Route
          path="/review"
          element={<PrivateRoute isAuth={true} RouteComponent={ReviewPage} />}
        />
        <Route
          path="/comment"
          element={<PrivateRoute isAuth={false} RouteComponent={CommentPage} />}
        />
        <Route
          path="/:profileType/:id"
          element={<PrivateRoute isAuth={false} RouteComponent={CastProfile} />}
        />
        <Route
          path="/recommend/:member_id"
          element={<PrivateRoute isAuth={false} RouteComponent={RecList} />}
        />
      </Routes>
    </BaseLayout>
  );
}

export default App;
