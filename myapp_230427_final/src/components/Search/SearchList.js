import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "assets/css/font.css";
import "assets/css/movielist.css";
import axios from "axios";

const SearchList = () => {
  // 슬라이드 사용하기 위한 선언 모음
  const imgNumber = 20;
  const imgWidth = 1280; // The width of each image box in pixels
  const [position, setPosition] = useState(0);

  const handlePrevClick = () => {
    if (position < 0) {
      setPosition(position + imgWidth);
    }
  };

  const handleNextClick = () => {
    const maxPosition = (-(imgNumber - 5) * imgWidth) / 5; // Assuming 5 images are shown at a time
    if (position > maxPosition) {
      setPosition(position - imgWidth);
    }
  };
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchActor, setSearchActor] = useState([]);
  const [searchDirector, setSearchDirector] = useState([]);
  //검색 영화 출력
  const { query } = useParams();

  console.log(query);

  useEffect(() => {
    axios
      .get(`http://localhost:8090/search/${query}`)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.searchMovieList);
        console.log(response.data.searchActorList);
        console.log(response.data.searchDirectorList);
        setSearchMovie(response.data.searchMovieList);
        setSearchActor(response.data.searchActorList);
        setSearchDirector(response.data.searchDirectorList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="slide">
          <p>검색된 영화가 {searchMovie.length}건 있습니다.</p>
          <div className="img_set">
            {/* 이미지박스 */}
            {/* left값으로 위치 변경 할 수 있음 */}
            <div
              className="img_set_set"
              style={{
                "--img-set-width": `${imgNumber * imgWidth}px`,
                "--img-set-position": `${position}px`,
              }}
            >
              {searchMovie &&
                searchMovie.slice(0, 20).map((movie, index) => (
                  <div
                    className="slide_movie"
                    key={`${movie.movie_id}-${index}`}
                  >
                    <div className="img_box">
                      <Link to={`/contents/${movie.movie_id}`}>
                        {movie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            alt="영화 포스터"
                          />
                        ) : (
                          <img src="\profile1.jpeg" alt="기본 포스터 이미지" />
                        )}
                        <div className="title_box">
                          <div className="title">{movie.title}</div>
                          <div className="date">{movie.release_date} 개봉</div>
                          <div className="rating">★ {movie.tmdb_vote_sum}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <button className="prev_button" onClick={handlePrevClick}>
            <img src={require("assets/img/left.png")}></img>
          </button>
          <button className="next_button" onClick={handleNextClick}>
            <img src={require("assets/img/right.png")}></img>
          </button>
        </div>{" "}
      </div>
      <div className="container">
        <p
          style={{
            fontSize: "25px",
            padding: "10px",
            fontWeight: "bold",
            width: "1280px",
          }}
        >
          배우
        </p>
        <div className="row" style={{ display: "flex", width: "1280px" }}>
          {searchActor && searchActor.length > 0 ? (
            searchActor.slice(0, 20).map((actor, index) => (
              <div
                key={`${actor.actor_id}-${index}`}
                className="col-sm-3 col-md-2 mr-auto ml-auto"
              >
                {/*  */}
                {actor.profile_path ? (
                  <Link to={`/actorProfile/${actor.actor_id}`}>
                    <h4 className="images-title">{actor.name}</h4>
                    <img
                      className="img-circle img-no-padding img-responsive"
                      src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                      alt="출연진 프로필 사진"
                    />
                    <p className="text-center">{actor.name}</p>
                  </Link>
                ) : (
                  <Link to={`/actorProfile/${actor.actor_id}`}>
                    <h4 className="images-title">{actor.name}</h4>
                    <img
                      className="img-circle img-no-padding img-responsive"
                      src="\pepeAk.png"
                      alt="출연진 프로필 사진이 없습니다."
                    />
                    <p className="text-center">{actor.name}</p>
                  </Link>
                )}
              </div>
            ))
          ) : (
            <p>검색된 결과가 없습니다.</p>
          )}
        </div>
      </div>
      <div className="container">
        <p style={{ fontSize: "25px", padding: "10px", fontWeight: "bold" }}>
          감독
        </p>
        {searchDirector && searchDirector.length > 0 ? (
          <div
            className="row"
            style={{ display: "flex", width: "1280px" }}
            // style={{ width: "1280px" }}
          >
            {searchDirector.slice(0, 10).map((director, index) => (
              <div key={`${director.director_id}-${index}`}>
                <div className="img_box">
                  {director.profile_path ? (
                    <Link to={`/dirProfile/${director.director_id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${director.profile_path}`}
                      />
                    </Link>
                  ) : (
                    <Link to={`/contents/${director.director}`}>
                      <img src="\emptyCast.png" />
                    </Link>
                  )}
                </div>
                <div className="title_box">
                  <div className="title">{director.name}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>검색된 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default SearchList;
