import { useState } from 'react';
import style from '../../assets/css/pilmography.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Pilmography = ({ castMovieList, dirMovieList }) => {
  const [itemsToShow, setItemsToShow] = useState(4);

  // 출연 영화
  const renderedMovies = castMovieList.slice(0, itemsToShow).map((movie) => {
    return (
      <div className={style.pilmo}>
        <div className={style.date}>{movie.release_date}</div>
        <div className={style.title}>
          <div className={style.poster}>
            <a href={`/contents/${movie.movie_id}`}>
              <img className={style.poster_img} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
            </a>
          </div>
          <div className={style.movie_name}>{movie.title}</div>
        </div>
        <div className={style.rating}>★ {(movie.tmdb_vote_sum / 2).toFixed(2)}</div>
      </div>
    );
  });

  // 감독/제작 영화
  const renderedDirectors = dirMovieList.slice(0, itemsToShow).map((movie) => {
    return (
      <div className={style.pilmo}>
        <div className={style.date}>{movie.release_date}</div>
        <div className={style.title}>
          <div className={style.poster}>
            <a href={`/contents/${movie.movie_id}`}>
              <img className={style.poster_img} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
            </a>
          </div>
          <div className={style.movie_name}>{movie.title}</div>
        </div>
        <div className={style.rating}>★ {(movie.tmdb_vote_sum / 2).toFixed(2)}</div>
      </div>
    );
  });

  return (
    <>
      <div>
        <div className={style.wrap}>
          <div className='movie'>
            <p style={{ fontSize: '15pt', fontWeight: 'bold' }}>출연한 영화</p>
            <div className={style.pilmo_title}>
              <div className={style.date_title}>개봉</div>
              <div className={style.title_title}>제목</div>
              <div className={style.rating_title}>평가</div>
            </div>
            {castMovieList && castMovieList.length > 0 ? (
              <>
                {renderedMovies}
                {itemsToShow < castMovieList.length && (
                  <div className={style.more_button} onClick={() => setItemsToShow(itemsToShow + 6)}>More <FontAwesomeIcon icon={faCaretDown}/></div>
                )}
              </>
            ) : (<div className='text-center p-5'>출연한 영화가 없습니다.</div>) }
          </div>


          <div className='director' style={{ marginTop: '50px' }}>
            <p style={{ fontSize: '15pt', fontWeight: 'bold' }}>감독/제작</p>
            <div className={style.pilmo_title}>
              <div className={style.date_title}>개봉</div>
              <div className={style.title_title}>제목</div>
              <div className={style.rating_title}>평가</div>
            </div>
            {dirMovieList && dirMovieList.length > 0 ? (
              <>
                {renderedDirectors}
                {itemsToShow < dirMovieList.length && (
                  <div className={style.more_button} onClick={() => setItemsToShow(itemsToShow + 6)}>More <FontAwesomeIcon icon={faCaretDown}/></div>
                )}
              </>
            ) : (<div className='text-center p-5'>감독/제작한 영화가 없습니다.</div>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pilmography;
