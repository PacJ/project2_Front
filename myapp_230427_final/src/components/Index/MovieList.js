import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'assets/css/font.css';
import 'assets/css/movielist.css';
import { useDispatch, useSelector } from 'react-redux';
import { MovieActions } from 'reduxs/Actions/MovieAction';

function MovieList({ movies = [], listTitle = "" }) {
  // 슬라이드 사용하기 위한 선언 모음
  const imgNumber = 20;
  const imgWidth = 1275; // The width of each image box in pixels
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
    <>
      {/* 이미지셋 */}
      <div className='slide'>
        <p>{listTitle}</p>
        <div className='img_set'>
          {/* 이미지박스 */}
          {/* left값으로 위치 변경 할 수 있음 */}
          <div className='img_set_set' style={{
            "--img-set-width": `${imgNumber * imgWidth}px`,
            "--img-set-position": `${position}px`,
          }}>
            {movies && movies.map((movie) => {
              return (
                <div className='slide_movie' key={movie.movie_id}>
                  <div className='img_box'>
                    <Link to={`/contents/${movie.movie_id}`}>
                      <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
                    </Link>
                  </div>
                  <div className='title_box'>
                    <div className='title'>{movie.title}</div>
                    <div className='date'>{movie.release_date} 개봉</div>
                    <div className='rating'>★ {movie.tmdb_vote_sum}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button className='prev_button' onClick={handlePrevClick}>
          <img src={require('assets/img/left.png')}></img>
        </button>
        <button className='next_button' onClick={handleNextClick}>
          <img src={require('assets/img/right.png')}></img>
        </button>
      </div>
    </>
  );
}

export default MovieList;
