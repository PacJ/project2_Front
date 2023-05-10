import React, { useState } from "react";
import { Link } from "react-router-dom";

const CastMovies = ({ castMovieList }) => {
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

  return (
    <div className="container">
      {castMovieList.length > 0 ? (
        <div className="slide">
          <p>{`출연한 영화가 ${castMovieList.length}건 있습니다.`}</p>
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
              {castMovieList &&
                castMovieList.slice(0, 20).map((movie, index) => (
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
        </div>
      ) : (
        <p style={{ fontSize: "25px", padding: "10px", fontWeight: "bold" }}>
          출연한 영화가 없습니다.
        </p>
      )}
    </div>
  );
};

export default CastMovies;
