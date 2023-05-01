import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Member/Register";
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
import CastProfile from "components/CastProfile/CastProfile";

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/genreselect" element={<GenreSelect />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/contents/:movie_id" element={<Contents />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/comment" element={<CommentPage />} />
        <Route path="/:profileType/:id" element={<CastProfile />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
