import React, { useState } from 'react';
import 'assets/css/font.css';
import 'assets/css/movielist.css';
import 'react-tooltip/dist/react-tooltip.css'
import Tooltip from '@mui/material/Tooltip';
// import ReactTooltip, { Tooltip } from 'react-tooltip';

function MovieList({ movies = [], listTitle = "" }) {
  // 슬라이드 사용하기 위한 선언 모음
  const imgNumber = movies.length;
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
        <p>{listTitle}
          {listTitle == '해외 평가 순위' ? 
          <Tooltip title="영화, TV 프로그램을 수집해 DB로 만드는 해외 평가 플랫폼" placement="right" arrow>
            <img src={`${process.env.PUBLIC_URL}/tmdb.svg`} style={{ height: '0.5em', marginLeft:'10px' }} /> 
          </Tooltip> : ''}
        </p>
        {/* <Tooltip place="right" type="info" id="my-tooltip"/> */}
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
                    <a href={`/contents/${movie.movie_id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                    </a>
                  </div>
                  <div className='title-box'>
                    <div className='title-box-title'>{movie.title}</div>
                    <div className='title-box-date'>{movie.release_date} 개봉</div>
                    <div className='d-flex justify-content'>
                    <div className='rating mr-2'>TMDB ★ {(movie.tmdb_vote_sum / 2).toFixed(2)}</div>
                    <div className='rating2'>・ 부귀영화 ★ {movie.vote_sum}</div>
                    </div>
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
