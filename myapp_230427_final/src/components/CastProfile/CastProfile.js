import React, { useEffect, useState } from "react";
import CastMovies from "./CastMovies";
import DirMovies from "./DirMovies";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import ComboBox from "components/Common/AutoComplete";

const CastProfile = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: localStorage.getItem("Authorization"),
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };
  const { actor_id, dir_id } = useParams();
  const { id, profileType } = useParams();

  //인물 이름, 사진 경로
  const [castInfo, setCastInfo] = useState({
    name: "",
    profile_path: "",
  });

  //배우가 출연한 영화
  const [castMovieList, setCastMovieList] = useState([]);

  //감독이 감독한 영화
  const [dirMovieList, setDirMovieList] = useState([]);

  const getMovies = async () => {
    await axios
      //profileType: 요청 페이지가 actorProfile || directorProfile인지 받는다.
      .get(`http://localhost:8090/${profileType}/${id}`, config)
      .then((response) => {
        // 요청 profileType이 배우면 배우state(출연한 영화)를 set한다.
        if (profileType === "actorProfile") {
          setCastMovieList(response.data.castMovieList);

          //요청 배우 인물(사진, 이름)을 담은 castInfo state을 한다.
          setCastInfo({
            name: response.data.actorInfo.name,
            profile_path: response.data.actorInfo.profile_path,
          });
        } else {
          // 요청 profileType이 감독이면 감독state(감독한 영화)를 set한다.
          setDirMovieList(response.data.dirMovieList);

          //요청 감독 인물(사진, 이름)을 담은 castInfo state을 set한다.
          setCastInfo({
            name: response.data.dirInfo.name,
            profile_path: response.data.dirInfo.profile_path,
          });
        }
      });
  };

  useEffect(() => {
    getMovies();
  }, [actor_id, dir_id]);

  return (
    <div className="container">
      {/* 인물 사진 존재의 유/무에 따른 사진 출력 */}
      {castInfo && castInfo.profile_path ? (
        <div>
          <h4 className="images-title" style={{ marginTop: "100px" }}>
            {castInfo.name}
          </h4>
          <img
            style={{ width: "180px", height: "270px" }}
            className="img-circle img-no-padding img-responsive"
            src={`https://image.tmdb.org/t/p/original/${castInfo.profile_path}`}
            alt="배우/감독 사진"
          />
          {/* <p className="text-center">{castInfo.name}</p> */}
        </div>
      ) : (
        <div>
          <h4 className="images-title" style={{ marginTop: "100px" }}>
            {castInfo.name}
          </h4>
          <img
            style={{ width: "180px", height: "270px" }}
            className="img-circle img-no-padding img-responsive"
            //인물 사진이 없을 시 기본 사진 경로("public\pepeAk.png")
            src="\pepeAk.png"
            alt="배우/감독 사진이 없습니다."
          />
          {/* <p className="text-center">{castInfo.name}</p> */}
        </div>
      )}

      {castMovieList && <CastMovies castMovieList={castMovieList} />}
      {dirMovieList && <DirMovies dirMovieList={dirMovieList} />}
    </div>
  );
};

export default CastProfile;
