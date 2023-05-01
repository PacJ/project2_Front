import SearchList from "./SearchList";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "assets/css/font.css";
import "assets/css/movielist.css";
import { useDispatch, useSelector } from "react-redux";
import { MovieActions } from "reduxs/Actions/MovieAction";
import axios from "axios";
import { baseUrl } from "Apiurl";
import { error } from "jquery";
import MovieReducer from "reduxs/Reducers/MovieReducer";

const SearchPage = () => {
  return (
    <div>
      <SearchList />
    </div>
  );
};

export default SearchPage;
