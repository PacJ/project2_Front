import 'assets/css/font.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProfileAction } from 'reduxs/Actions/ProfileAction';
import style from '../../assets/css/profile.module.css';

const ProfileListMore = () => {
  const dispatch = useDispatch();
  const { member_id } = useParams();
  const wishList = useSelector((state) => state.profile.wishList);
  const ratingList = useSelector((state) => state.profile.ratingList);
  const [movies, setMovies] = useState([]);
  const { path } = useParams();
  const [option, setOption] = useState('최신순');
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(ProfileAction.getProfileList(member_id));
  }, []);

  //movies에 path 값에 따라 다른 List를 담아준다.
  useEffect(() => {
    if (path === 'wish') {
      setMovies(wishList);
      console.log('wish');
    } else if (path === 'rating') {
      setMovies(ratingList);
      console.log('rating');
    }
  }, [path, wishList, ratingList]);

  console.log(movies);

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <div style={{ width: '100%', height: '150px' }}></div>
        <div style={{ width: '100%' }}>
          <div style={{ width: '1100px', margin: 'auto' }}>
            <div
              style={{
                width: '100%',
                height: '50px',
              }}
            >
              {path === 'wish' ? (
                <p className={style.list_title}>보고싶어요</p>
              ) : (
                <p className={style.list_title}>평가를 완료한 영화</p>
              )}
              <div className={style.dropdown} ref={dropdownRef}>
                <div
                  className={style.menu_title}
                  onClick={() => setMenuOpen(!menuOpen)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = '#d43f3f')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = '#e75757')
                  }
                >
                  <p>{option}</p>
                </div>
                {menuOpen && (
                  <div className={style.menu_box}>
                    <div className={style.option_box}>
                      <div
                        className={style.option_hover}
                        onClick={() => {
                          const sortedMovies = [...movies].sort(function (
                            a,
                            b
                          ) {
                            const dateA = new Date(a.regdate);
                            const dateB = new Date(b.regdate);
                            return dateB - dateA;
                          });
                          setMovies(sortedMovies);
                          setOption('최신순');
                          setMenuOpen(!menuOpen);
                        }}
                      >
                        <p>최신순</p>
                      </div>
                    </div>
                    <div className={style.option_box}>
                      <div
                        className={style.option_hover}
                        onClick={() => {
                          const sortedMovies = [...movies].sort(function (
                            a,
                            b
                          ) {
                            const dateA = new Date(a.regdate);
                            const dateB = new Date(b.regdate);
                            return dateA - dateB;
                          });

                          setOption('오래된 순');
                          setMenuOpen(!menuOpen);
                          setMovies(sortedMovies);
                        }}
                      >
                        <p>오래된 순</p>
                      </div>
                    </div>
                    <div className={style.option_box}>
                      <div
                        className={style.option_hover}
                        onClick={() => {
                          const sortedMovies = [...movies].sort(function (
                            a,
                            b
                          ) {
                            return b.tmdb_vote_sum - a.tmdb_vote_sum;
                          });
                          setMovies(sortedMovies);
                          setOption('평점 높은 순');
                          setMenuOpen(!menuOpen);
                        }}
                      >
                        <p>평점 높은 순</p>
                      </div>
                    </div>
                    <div className={style.option_box}>
                      <div
                        className={style.option_hover}
                        onClick={() => {
                          const sortedMovies = [...movies].sort(function (
                            a,
                            b
                          ) {
                            return a.tmdb_vote_sum - b.tmdb_vote_sum;
                          });
                          setMovies(sortedMovies);
                          setOption('평점 낮은 순');
                          setMenuOpen(!menuOpen);
                        }}
                      >
                        <p>평점 낮은 순</p>
                      </div>
                    </div>
                    <div className={style.option_box}>
                      <div
                        className={style.option_hover}
                        onClick={() => {
                          const sortedMovies = [...movies].sort(function (
                            a,
                            b
                          ) {
                            const dateA = new Date(a.release_date);
                            const dateB = new Date(b.regdate);
                            return dateB - dateA;
                          });
                          setMovies(sortedMovies);
                          setOption('출시일 순');
                          setMenuOpen(!menuOpen);
                        }}
                      >
                        <p>출시일 순</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {movies &&
              movies.map((movie) => {
                return (
                  <>
                    <div
                      className='slide_movie'
                      key={movie.movie_id}
                      style={{
                        height: 'auto',
                        width: '125px',
                        float: 'left',
                        marginLeft: '11px',
                      }}
                    >
                      <div
                        style={{
                          marginBottom: '10px',
                        }}
                      >
                        <a href={`/contents/${movie.movie_id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            style={{
                              borderRadius: 3,
                              width: '125px',
                              height: '185px',
                            }}
                          />
                        </a>
                      </div>
                      {/* 영화 타이틀 */}
                      <div
                        className='titlebox'
                        style={{
                          overflow: 'hidden',
                          wordBreak: 'breakall',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          width: '125px',
                        }}
                      >
                        <div className='movie_title'>
                          <p
                            style={{
                              overflow: 'hidden',
                              wordBreak: 'breakall',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              fontWeight: 'bold',
                              fontSize: '10pt',
                              fontFamily: 'NanumSquare',
                            }}
                          >
                            {movie.title}
                          </p>
                        </div>

                        <div
                          className='movie_date'
                          style={{
                            fontSize: '14px',
                            fontFamily: 'NanumSquare',
                          }}
                        >
                          {movie.release_date}
                        </div>
                        <div
                          className='movie_rating'
                          style={{
                            fontSize: '15px',
                            color: '#fc8080',
                            fontFamily: 'NanumSquare',
                            marginBottom: '20px',
                          }}
                        >
                          ★ {movie.tmdb_vote_sum}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileListMore